import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaBookmark, FaUser } from 'react-icons/fa';
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

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #a0a0c0;
  font-size: 1.1rem;
  text-align: center;
  max-width: 600px;
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

export default function Explore() {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Explorar - Plenitude</title>
        <meta name="description" content="Explore meditações cristãs" />
      </Head>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>Explorar Meditações</Title>
          <Subtitle>
            Aqui você encontrará diversas categorias e temas para suas meditações diárias.
            Em breve disponibilizaremos uma busca avançada e recomendações personalizadas.
          </Subtitle>
        </motion.div>
      </Container>

      <NavbarContainer>
        <NavItem onClick={() => router.push('/')}>
          <FaHome />
          <span>Início</span>
        </NavItem>
        <NavItem active>
          <FaSearch />
          <span>Explorar</span>
        </NavItem>
        <NavItem onClick={() => router.push('/saved')}>
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
