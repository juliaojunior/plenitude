// pages/profile.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FaCog,
  FaHistory,
  FaHeart,
  FaBell,
  FaSignOutAlt
} from 'react-icons/fa';
import Head from 'next/head';

import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';

// IMPORT CORRETO para o seu firebase.js em /lib
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
`;

const Content = styled.div`
  padding: 1.5rem;
  padding-bottom: 5rem; /* espaço para a navbar */
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.2rem;
  text-align: center;
  
  h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #7251b5;
  }
  
  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const MenuItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    font-size: 1.2rem;
    margin-right: 1rem;
    color: ${props => props.iconColor || '#7251b5'};
  }
  
  .label {
    flex: 1;
  }
  
  .arrow {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const LogoutButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background: rgba(238, 82, 83, 0.2);
  border: none;
  border-radius: 12px;
  color: #ff6b6b;
  font-weight: 600;
  margin-top: 2rem;
  cursor: pointer;
  
  &:hover {
    background: rgba(238, 82, 83, 0.3);
  }
`;

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Escuta mudanças na autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (!currentUser) {
        router.replace('/login');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Loading enquanto busca user
  if (!user) {
    return <p>Carregando…</p>;
  }

  // Exemplo de estatísticas (substitua por dados reais do Firestore, se quiser)
  const stats = { days: 0, minutes: 0 };

  // Desloga o usuário
  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push('/login');
    });
  };

  return (
    <Container>
      <Head>
        <title>Perfil – Plenitude</title>
        <meta name="description" content="Seu perfil no app Plenitude" />
      </Head>

      <Content>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileHeader 
            name={user.displayName || user.email || 'Usuário'}
            email={user.email}
            image={user.photoURL || '/icons/icon-192x192.png'}
          />

          <StatsContainer>
            <StatCard>
              <h3>{stats.days}</h3>
              <p>Dias meditando</p>
            </StatCard>
            <StatCard>
              <h3>{stats.minutes}</h3>
              <p>Minutos totais</p>
            </StatCard>
          </StatsContainer>

          <MenuList>
            <MenuItem whileTap={{ scale: 0.98 }}>
              <FaHistory />
              <span className="label">Histórico de meditações</span>
              <span className="arrow">&gt;</span>
            </MenuItem>
            <MenuItem whileTap={{ scale: 0.98 }} iconColor="#4cc9f0">
              <FaHeart />
              <span className="label">Meditações favoritas</span>
              <span className="arrow">&gt;</span>
            </MenuItem>
            <MenuItem whileTap={{ scale: 0.98 }} iconColor="#f72585">
              <FaBell />
              <span className="label">Lembretes diários</span>
              <span className="arrow">&gt;</span>
            </MenuItem>
            <MenuItem whileTap={{ scale: 0.98 }} iconColor="#4361ee">
              <FaCog />
              <span className="label">Configurações</span>
              <span className="arrow">&gt;</span>
            </MenuItem>
          </MenuList>

          <LogoutButton whileTap={{ scale: 0.98 }} onClick={handleLogout}>
            <FaSignOutAlt />
            Sair da conta
          </LogoutButton>
        </motion.div>
      </Content>

      <Navbar />
    </Container>
  );
}
