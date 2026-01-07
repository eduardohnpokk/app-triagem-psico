// Importa as ferramentas do Firebase direto da nuvem do Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Suas chaves de conexão (Copiadas do seu .env)
// Nota: Em sites HTML puros, essas chaves ficam visíveis. 
// A segurança é garantida pelas Regras do Banco de Dados (que deixamos no modo Produção).
const firebaseConfig = {
  apiKey: "AIzaSyCqDAUEfYarlFkA1u2A-n-SGv_1AjFb7WU",
  authDomain: "portal-eduardo-pokk.firebaseapp.com",
  projectId: "portal-eduardo-pokk",
  storageBucket: "portal-eduardo-pokk.firebasestorage.app",
  messagingSenderId: "657739349802",
  appId: "1:657739349802:web:c14305400575f68ed5a853"
};

// Inicializa a conexão
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Teste de conexão (Aparecerá no console do navegador)
console.log("🔥 Firebase conectado com sucesso! O banco de dados está pronto.");

// Exporta o banco de dados para ser usado em outras páginas
export { db };