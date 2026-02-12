import { buffer } from 'micro';
import Stripe from 'stripe';
import admin from 'firebase-admin';

// Desativa o parser padrão do Next.js para ler o corpo bruto do Stripe
export const config = {
  api: {
    bodyParser: false,
  },
};

// Inicializa o Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Inicializa o Firebase Admin (Chave Mestra)
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Corrige a formatação da chave privada (quebras de linha)
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
  // Apenas aceita POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  // 1. Verifica a assinatura do Stripe (Segurança)
  try {
    if (!webhookSecret) throw new Error("Webhook Secret não configurado na Vercel");
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error(`Erro de assinatura Webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. Processa o Evento
  const data = event.data.object;
  // Tenta pegar o email do cliente (varia dependendo do evento)
  const email = data.email || data.customer_email || (data.customer_details && data.customer_details.email);

  if (email) {
    console.log(`Processando evento ${event.type} para: ${email}`);
    
    try {
      // Busca o usuário no banco pelo e-mail
      const usersRef = db.collection('usuarios');
      const snapshot = await usersRef.where('email', '==', email).limit(1).get();

      if (snapshot.empty) {
        console.log('Usuário não encontrado no banco para este e-mail.');
        // Não retorna erro 500 para não travar o Stripe, apenas loga
        return res.status(200).json({ received: true, status: "user_not_found" });
      }

      const userDoc = snapshot.docs[0];
      const userId = userDoc.id;

      // CENÁRIO 1: Pagamento Aprovado ou Assinatura Criada
      if (event.type === 'checkout.session.completed' || event.type === 'invoice.payment_succeeded') {
        await usersRef.doc(userId).update({ 
            status: 'ativo',
            ultimo_pagamento: new Date(),
            stripe_customer_id: data.customer || null
        });
        console.log(`ACESSO ATIVADO: ${email}`);
      }

      // CENÁRIO 2: Pagamento Falhou ou Cancelado
      if (event.type === 'customer.subscription.deleted' || event.type === 'invoice.payment_failed') {
        await usersRef.doc(userId).update({ status: 'bloqueado' });
        console.log(`ACESSO BLOQUEADO: ${email}`);
      }

    } catch (error) {
      console.error('Erro ao atualizar Firestore:', error);
      return res.status(500).send('Erro interno no banco de dados');
    }
  } else {
      console.log(`Evento sem e-mail identificado: ${event.type}`);
  }

  res.status(200).json({ received: true });
}
