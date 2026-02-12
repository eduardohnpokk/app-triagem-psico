import { buffer } from 'micro';
import Stripe from 'stripe';
import admin from 'firebase-admin';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
      }),
    });
    console.log("Firebase Admin conectado.");
  } catch (error) {
    console.error("Erro ao conectar Firebase Admin:", error);
  }
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    if (!webhookSecret) throw new Error("Webhook Secret não configurado na Vercel");
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error(`Erro de assinatura Webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const data = event.data.object;
  const email = data.email || data.customer_email || (data.customer_details && data.customer_details.email);

  if (email) {
    console.log(`Processando evento ${event.type} para: ${email}`);
    
    try {
      const usersRef = db.collection('usuarios');
      const snapshot = await usersRef.where('email', '==', email).limit(1).get();

      if (snapshot.empty) {
        console.log('Usuário não encontrado.');
        return res.status(200).json({ received: true, status: "user_not_found" });
      }

      const userDoc = snapshot.docs[0];
      const userId = userDoc.id;

      if (event.type === 'checkout.session.completed' || event.type === 'invoice.payment_succeeded') {
        await usersRef.doc(userId).update({ 
            status: 'ativo',
            ultimo_pagamento: new Date(),
            stripe_customer_id: data.customer || null
        });
        console.log(`ACESSO ATIVADO: ${email}`);
      }

      if (event.type === 'customer.subscription.deleted' || event.type === 'invoice.payment_failed') {
        await usersRef.doc(userId).update({ status: 'bloqueado' });
        console.log(`ACESSO BLOQUEADO: ${email}`);
      }

    } catch (error) {
      console.error('Erro Firestore:', error);
      return res.status(500).send('Erro interno');
    }
  }

  res.status(200).json({ received: true });
}
