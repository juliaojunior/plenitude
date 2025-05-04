import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaBookmark, FaUser, FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem;
  padding-bottom: 5rem; // Espaço para a navbar
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentBox = styled(motion.div)`
  background: rgba(30, 30, 60, 0.4);
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 3rem;
  color: #7251b5;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #a0a0c0;
  font-size: 1.1rem;
  line-height: 1.6;
`;

// Navbar (mesma do index.js)
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

export default function Saved() {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Meditações Salvas - Plenitude</title>
        <meta name="description" content="Suas meditações salvas" />
      </Head>

      <Container>
        <ContentBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Icon>
            <FaHeart />
          </Icon>
          <Title>Suas Meditações Salvas</Title>
          <Message>
            Aqui você encontrará todas as meditações que marcou como favoritas.
            Comece salvando suas meditações preferidas para acessá-las facilmente mais tarde.
          </Message>
        </ContentBox>
      </Container>

      <NavbarContainer>
        <NavItem onClick={() => router.push('/')}>
          <FaHome />
          <span>Início</span>
        </NavItem>
        <NavItem onClick={() => router.push('/explore')}>
          <FaSearch />
          <span>Explorar</span>
        </NavItem>
        <NavItem active>
          <FaBookmark />
          <span>Salvos</span>
        </NavItem>
        <NavItem onClick={() => router.push('/profile')}>
          <FaUser />
          <span>Perfil</span>
        </NavItem>
      </NavbarContainer>
    </>
  );
}
