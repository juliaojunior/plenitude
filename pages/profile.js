import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaHome, FaSearch, FaBookmark, FaUser, 
  FaBell, FaMoon, FaDownload, FaSignOutAlt, 
  FaCalendarAlt, FaClock, FaChartLine, FaMedal
} from 'react-icons/fa';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Componentes estilizados
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem;
  padding-bottom: 5rem; // Espaço para a navbar
`;

// Header do perfil
const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(30, 30, 60, 0.4);
  border-radius: 16px;
`;

const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7251b5, #5e72e4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  margin-right: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const ProfileInfo = styled.div`
  flex: 1;

  h2 {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  p {
    color: #a0a0c0;
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }
`;

const ProfileBadge = styled.span`
  background: #7251b5;
  color: white;
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-weight: 500;
`;

// Seção de estatísticas
const StatsSection = styled.section`
  margin-bottom: 2rem;
`;

const StatsTitle = styled.h2`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const StatsCard = styled.div`
  background: rgba(30, 30, 60, 0.4);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
`;

const StatsValue = styled.div`
  color: #7251b5;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
`;

const StatsLabel = styled.div`
  color: #a0a0c0;
  font-size: 0.8rem;
`;

// Lista de preferências
const PreferencesList = styled.div`
  background: rgba(30, 30, 60, 0.4);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const PreferenceItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }

  svg {
    color: #7251b5;
    font-size: 1.3rem;
    margin-right: 1rem;
  }
`;

const PreferenceText = styled.div`
  flex: 1;
  
  h3 {
    color: white;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
  }
  
  p {
    color: #a0a0c0;
    font-size: 0.8rem;
  }
`;

const Toggle = styled.div`
  width: 50px;
  height: 26px;
  background: ${props => props.checked ? '#7251b5' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 13px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
  
  &:after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${props => props.checked ? '27px' : '3px'};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: left 0.3s;
  }
`;

const LogoutButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #ff6b6b;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  
  svg {
    font-size: 1.1rem;
  }
`;

// Componente Navbar
const NavbarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-around;
  padding: 0.8rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavItem = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.active ? '#7251b5' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  span {
    font-size: 0.7rem;
    margin-top: 0.2rem;
  }
`;

// Componente Navbar corrigido
const Navbar = () => (
  <NavbarContainer>
    <NavItem onClick={() => router.push('/')}>
      <FaHome />
      <span>Início</span>
    </NavItem>
    <NavItem>
      <FaSearch />
      <span>Explorar</span>
    </NavItem>
    <NavItem>
      <FaBookmark />
      <span>Salvos</span>
    </NavItem>
    <NavItem active>
      <FaUser />
      <span>Perfil</span>
    </NavItem>
  </NavbarContainer>
);

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Ocorreu um erro ao fazer logout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Perfil - Plenitude</title>
        <meta name="description" content="Seu perfil no aplicativo de meditação cristã" />
      </Head>

      <Container>
        <ProfileHeader>
          <ProfileAvatar>
            {/* Se tiver URL da foto do usuário */}
            {/*  */}
            <FaUser />
            {/* Ícone padrão caso não tenha foto */}
          </ProfileAvatar>

          <ProfileInfo>
            <h2>Maria Silva</h2>
            <p>maria.silva@exemplo.com</p>
            <ProfileBadge>Premium</ProfileBadge>
          </ProfileInfo>
        </ProfileHeader>

        <StatsSection>
          <StatsTitle>Sua Jornada</StatsTitle>
          <StatsGrid>
            <StatsCard>
              <StatsValue>28</StatsValue>
              <StatsLabel>Dias Consecutivos</StatsLabel>
            </StatsCard>
            <StatsCard>
              <StatsValue>126</StatsValue>
              <StatsLabel>Meditações</StatsLabel>
            </StatsCard>
            <StatsCard>
              <StatsValue>42h</StatsValue>
              <StatsLabel>Tempo Total</StatsLabel>
            </StatsCard>
          </StatsGrid>
        </StatsSection>

        <PreferencesList>
          <PreferenceItem>
            <FaBell />
            <PreferenceText>
              <h3>Lembretes</h3>
              <p>Diariamente às 07:00</p>
            </PreferenceText>
            <Toggle />
          </PreferenceItem>

          <PreferenceItem>
            <FaMoon />
            <PreferenceText>
              <h3>Modo Noturno</h3>
              <p>Ativado</p>
            </PreferenceText>
            <Toggle checked />
          </PreferenceItem>

          <PreferenceItem>
            <FaDownload />
            <PreferenceText>
              <h3>Download de Meditações</h3>
              <p>Apenas em Wi-Fi</p>
            </PreferenceText>
            <Toggle checked />
          </PreferenceItem>
        </PreferencesList>

        <LogoutButton onClick={handleLogout} whileTap={{ scale: 0.95 }}>
          <FaSignOutAlt />
          {loading ? 'Saindo...' : 'Sair'}
        </LogoutButton>

        {/* Navbar incorporada como componente */}
        <NavbarContainer>
          <NavItem onClick={() => router.push('/')}>
            <FaHome />
            <span>Início</span>
          </NavItem>
          <NavItem onClick={() => router.push('/explore')}>
            <FaSearch />
            <span>Explorar</span>
          </NavItem>
          <NavItem onClick={() => router.push('/saved')}>
            <FaBookmark />
            <span>Salvos</span>
          </NavItem>
          <NavItem active>
            <FaUser />
            <span>Perfil</span>
          </NavItem>
        </NavbarContainer>



      </Container>
    </>
  );
}
