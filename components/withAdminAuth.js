// components/withAdminAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { isAdmin } from '../lib/firestore';

export default function withAdminAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const checkAuth = async () => {
        try {
          // Verificar se há usuário logado
          if (!auth.currentUser) {
            router.push('/login');
            return;
          }
          
          // Verificar se é administrador
          const adminStatus = await isAdmin();
          if (!adminStatus) {
            console.log("Usuário não é administrador, redirecionando...");
            router.push('/profile');
            return;
          }
          
          // Se chegou aqui, é administrador
          setLoading(false);
        } catch (error) {
          console.error("Erro ao verificar permissões:", error);
          router.push('/profile');
        }
      };
      
      // Verificar autenticação quando o componente montar
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          checkAuth();
        } else {
          router.push('/login');
        }
      });
      
      return () => unsubscribe();
    }, [router]);
    
    if (loading) {
      return <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Verificando permissões...
      </div>;
    }
    
    return <Component {...props} />;
  };
}
