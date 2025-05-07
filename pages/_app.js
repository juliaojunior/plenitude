// pages/_app.js
import { useEffect } from 'react';
import { auth } from '../lib/firebase';
import { createUserProfile } from '../lib/user';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Configurar listener de autenticação
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Usuário está logado
        console.log("Usuário detectado:", user.uid);
        
        // Criar/atualizar perfil
        try {
          await createUserProfile(user);
        } catch (err) {
          console.error("Erro ao criar perfil:", err);
        }
      } else {
        console.log("Nenhum usuário logado");
      }
    });
    
    // Limpar listener ao desmontar
    return () => unsubscribe();
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;
