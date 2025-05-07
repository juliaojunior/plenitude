// pages/explore.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaHome, FaSearch, FaBookmark, FaUser, 
  FaBrain, FaHeart, FaDove, FaBook, 
  FaMoon, FaBullseye 
} from 'react-icons/fa';
import { useRouter } from 'next/router';

// Estilos
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem;
  padding-bottom: 5rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const SearchBar = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  margin-top: 1.5rem;
  
  input {
    flex: 1;
    background: transparent;
    border: none;
    color: white;
    font-size: 1rem;
    
    &:focus {
      outline: none;
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }
  
  svg {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.2rem;
    margin-right: 0.8rem;
  }
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CategoryCard = styled(motion.div)`
  background: rgba(30, 30, 60, 0.6);
  border-radius: 16px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const IconBackground = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color || '#7251b5'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.8rem;
  color: white;
  font-size: 1.5rem;
`;

const CategoryTitle = styled.p`
  color: #fff;
  font-weight: 500;
  font-size: 0.95rem;
`;

const MeditationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MeditationItem = styled(motion.div)`
  background: rgba(30, 30, 60, 0.4);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const MeditationInfo = styled.div``;

const MeditationTitle = styled.h3`
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const MeditationScripture = styled.p`
  color: #7251b5;
  font-size: 0.8rem;
`;

const MeditationMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const MeditationCategory = styled.span`
  color: #a0a0c0;
  font-size: 0.75rem;
`;

const MeditationDuration = styled.span`
  color: #a0a0c0;
  font-size: 0.75rem;
`;

// Navbar - componentes corrigidos
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
  z-index: 100;
`;

const NavItem = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.$active ? '#7251b5' : 'rgba(255, 255, 255, 0.6)'};
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

// Dados temporários (mais tarde serão do Firebase)
const categories = [
  { id: 'anxiety', title: 'Ansiedade', icon: <FaBrain />, color: '#7251b5' },
  { id: 'gratitude', title: 'Gratidão', icon: <FaHeart />, color: '#e74c3c' },
  { id: 'peace', title: 'Paz', icon: <FaDove />, color: '#3498db' },
  { id: 'wisdom', title: 'Sabedoria', icon: <FaBook />, color: '#f1c40f' },
  { id: 'sleep', title: 'Sono', icon: <FaMoon />, color: '#9b59b6' },
  { id: 'focus', title: 'Foco', icon: <FaBullseye />, color: '#2ecc71' }
];

const popularMeditations = [
  { 
    id: 'med1', 
    title: 'Libertando-se da Ansiedade', 
    scripture: 'Filipenses 4:6-7',
    category: 'Ansiedade',
    duration: '15 min' 
  },
  { 
    id: 'med2', 
    title: 'Cultivando Gratidão Diária', 
    scripture: '1 Tessalonicenses 5:18',
    category: 'Gratidão',
    duration: '10 min' 
  },
  { 
    id: 'med3', 
    title: 'Encontrando Paz em Meio à Tempestade', 
    scripture: 'João 14:27',
    category: 'Paz',
    duration: '20 min' 
  }
];

export default function Explore() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleMeditationClick = (meditationId) => {
    router.push(`/meditation/${meditationId}`);
  };
  
  const handleCategoryClick = (categoryId) => {
    router.push(`/category/${categoryId}`);
  };
  
  return (
    <>
      <Head>
        <title>Explorar - Plenitude</title>
        <meta name="description" content="Explore meditações cristãs" />
      </Head>

      <Container>
        <Header>
          <Title>Explorar</Title>
          <SearchBar>
            <FaSearch />
            <input 
              type="text" 
              placeholder="Buscar meditações" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBar>
        </Header>
        
        <SectionTitle>Categorias</SectionTitle>
        <CategoryGrid>
          {categories.map(category => (
            <CategoryCard 
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <IconBackground color={category.color}>
                {category.icon}
              </IconBackground>
              <CategoryTitle>{category.title}</CategoryTitle>
            </CategoryCard>
          ))}
        </CategoryGrid>
        
        <SectionTitle>Meditações Populares</SectionTitle>
        <MeditationList>
          {popularMeditations.map(meditation => (
            <MeditationItem
              key={meditation.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleMeditationClick(meditation.id)}
            >
              <MeditationInfo>
                <MeditationTitle>{meditation.title}</MeditationTitle>
                <MeditationScripture>{meditation.scripture}</MeditationScripture>
              </MeditationInfo>
              <MeditationMeta>
                <MeditationCategory>{meditation.category}</MeditationCategory>
                <MeditationDuration>{meditation.duration}</MeditationDuration>
              </MeditationMeta>
            </MeditationItem>
          ))}
        </MeditationList>

        {/* Navbar corrigida */}
        <NavbarContainer>
          <NavItem onClick={() => router.push('/')}>
            <FaHome />
            <span>Início</span>
          </NavItem>
          <NavItem $active={true}>
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
      </Container>
    </>
  );
}
