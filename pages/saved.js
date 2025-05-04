// pages/saved.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaBookmark, FaUser, FaHeart, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/router';
// Importar Firebase após configurar
// import { db, auth } from '../lib/firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';

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

const Subtitle = styled.p`
  color: #a0a0c0;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 3rem 1rem;
  
  svg {
    color: #7251b5;
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    color: white;
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: #a0a0c0;
    font-size: 0.95rem;
    line-height: 1.5;
    max-width: 300px;
    margin: 0 auto;
  }
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
  position: relative;
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

const RemoveButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 100, 100, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  z-index: 2;
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

// Dados temporários (mais tarde serão do Firebase)
const savedMeditations = [
  { 
    id: 'med1', 
    title: 'Libertando-se da Ansiedade', 
    scripture: 'Filipenses 4:6-7',
    category: 'Ansiedade',
    duration: '15 min',
    savedAt: '2023-05-01'
  },
  { 
    id: 'med4', 
    title: 'O Poder da Fé', 
    scripture: 'Hebreus 11:1',
    category: 'Fé',
    duration: '18 min',
    savedAt: '2023-04-28'
  }
];

export default function Saved() {
  const router = useRouter();
  const [favorites, setFavorites] = useState(savedMeditations);
  
  // Quando tiver Firebase, este useEffect buscará os favoritos do usuário
  /*
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!auth.currentUser) return;
      
      const favoritesRef = collection(db, 'favorites');
      const q = query(favoritesRef, where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const favoritesData = [];
      querySnapshot.forEach((doc) => {
        favoritesData.push({ id: doc.id, ...doc.data() });
      });
      
      setFavorites(favoritesData);
    };
    
    fetchFavorites();
  }, []);
  */
  
  const handleMeditationClick = (meditationId) => {
    router.push(`/meditation/${meditationId}`);
  };
  
  const handleRemoveFavorite = (e, meditationId) => {
    e.stopPropagation(); // Evita que o clique chegue ao item da meditação
    
    // Atualização local (para UI)
    setFavorites(favorites.filter(med => med.id !== meditationId));
    
    // Quando tiver Firebase, aqui você deletaria do banco de dados
    // const docRef = doc(db, 'favorites', favoriteDocId);
    // deleteDoc(docRef);
  };
  
  return (
    <>
      <Head>
        <title>Meditações Salvas - Plenitude</title>
        <meta name="description" content="Suas meditações salvas" />
      </Head>

      <Container>
        <Header>
          <Title>Meditações Salvas</Title>
          <Subtitle>
            Suas meditações favoritas reunidas em um só lugar para acesso rápido.
          </Subtitle>
        </Header>
        
        {favorites.length === 0 ? (
          <EmptyState
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaHeart />
            <h2>Nenhuma meditação salva</h2>
            <p>
              Quando você marcar meditações como favoritas, elas aparecerão aqui para fácil acesso.
            </p>
          </EmptyState>
        ) : (
          <MeditationList>
            {favorites.map(meditation => (
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
                <RemoveButton 
                  onClick={(e) => handleRemoveFavorite(e, meditation.id)}
                >
                  <FaTrash />
                </RemoveButton>
              </MeditationItem>
            ))}
          </MeditationList>
        )}
        
        {/* Navbar corrigida */}
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
      </Container>
    </>
  );
}
