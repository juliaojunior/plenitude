// pages/admin/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaUsers, FaBook, FaCalendarAlt, FaClock, 
  FaPlusCircle, FaSignOutAlt, FaChartLine, FaUserCircle 
} from 'react-icons/fa';
import { auth } from '../../lib/firebase';
import { isAdmin, getAppStats } from '../../lib/firestore';
import withAdminAuth from '../../components/withAdminAuth';

// Estilos
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.8rem;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ProfileButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-right: 1rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(30, 30, 60, 0.6);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color || '#7251b5'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.5rem;
`;

const StatValue = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #a0a0c0;
  font-size: 0.9rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ActionCard = styled(motion.div)`
  background: rgba(30, 30, 60, 0.4);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ActionIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.color || '#7251b5'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.8rem;
`;

const ActionTitle = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ActionDescription = styled.div`
  color: #a0a0c0;
  font-size: 0.9rem;
  text-align: center;
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: white;
  font-size: 1.2rem;
`;

const ErrorState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: #ff6b6b;
  font-size: 1.2rem;
  text-align: center;
  padding: 0 2rem;
`;

function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const appStats = await getAppStats();
        setStats(appStats);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        setError('Não foi possível carregar as estatísticas.');
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  
  const handleProfileClick = () => {
    router.push('/profile');
  };
  
  if (loading) {
    return (
      <Container>
        <LoadingState>Carregando dashboard...</LoadingState>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <ErrorState>{error}</ErrorState>
      </Container>
    );
  }
  
  return (
    <>
      <Head>
        <title>Dashboard Admin - Plenitude</title>
        <meta name="description" content="Painel administrativo do aplicativo Plenitude" />
      </Head>

      <Container>
        <Header>
          <Title>Dashboard Admin</Title>
          <HeaderActions>
            <ProfileButton onClick={handleProfileClick}>
              <FaUserCircle />
              Meu Perfil
            </ProfileButton>
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt />
              Sair
            </LogoutButton>
          </HeaderActions>
        </Header>
        
        <SectionTitle>Estatísticas</SectionTitle>
        <StatsGrid>
          <StatCard
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <StatIcon color="#7251b5">
              <FaUsers />
            </StatIcon>
            <StatValue>{stats?.totalUsers || 0}</StatValue>
            <StatLabel>Usuários Registrados</StatLabel>
          </StatCard>
          
          <StatCard
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <StatIcon color="#5167e4">
              <FaBook />
            </StatIcon>
            <StatValue>{stats?.totalMeditations || 0}</StatValue>
            <StatLabel>Meditações Disponíveis</StatLabel>
          </StatCard>
          
          <StatCard
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <StatIcon color="#e74c3c">
              <FaCalendarAlt />
            </StatIcon>
            <StatValue>{stats?.totalSessions || 0}</StatValue>
            <StatLabel>Sessões Completadas</StatLabel>
          </StatCard>
          
          <StatCard
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <StatIcon color="#2ecc71">
              <FaClock />
            </StatIcon>
            <StatValue>{stats?.totalMinutes || 0}</StatValue>
            <StatLabel>Minutos de Meditação</StatLabel>
          </StatCard>
        </StatsGrid>
        
        <SectionTitle>Ações</SectionTitle>
        <ActionGrid>
          <ActionCard
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/admin/meditations/new')}
          >
            <ActionIcon color="#7251b5">
              <FaPlusCircle />
            </ActionIcon>
            <ActionTitle>Nova Meditação</ActionTitle>
            <ActionDescription>
              Adicionar uma nova meditação ao aplicativo
            </ActionDescription>
          </ActionCard>
          
          <ActionCard
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/admin/mana/new')}
          >
            <ActionIcon color="#e74c3c">
              <FaCalendarAlt />
            </ActionIcon>
            <ActionTitle>Novo Maná Diário</ActionTitle>
            <ActionDescription>
              Adicionar uma nova reflexão para o Maná Diário
            </ActionDescription>
          </ActionCard>
          
          <ActionCard
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/admin/meditations')}
          >
            <ActionIcon color="#3498db">
              <FaBook />
            </ActionIcon>
            <ActionTitle>Gerenciar Meditações</ActionTitle>
            <ActionDescription>
              Visualizar, editar ou remover meditações existentes
            </ActionDescription>
          </ActionCard>
          
          <ActionCard
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/admin/reports')}
          >
            <ActionIcon color="#2ecc71">
              <FaChartLine />
            </ActionIcon>
            <ActionTitle>Relatórios</ActionTitle>
            <ActionDescription>
              Visualizar estatísticas detalhadas e relatórios
            </ActionDescription>
          </ActionCard>
        </ActionGrid>
      </Container>
    </>
  );
}

// Exportar com o HOC de proteção
export default withAdminAuth(AdminDashboard);
