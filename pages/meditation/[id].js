// pages/meditation/[id].js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, FaHeart, FaShare, FaPlay, FaPause, 
  FaRedo, FaHome, FaSearch, FaBookmark, FaUser, FaMoon, FaBullseye 
} from 'react-icons/fa';

// Estilos
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem;
  padding-bottom: 5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const HeaderActions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.$active={true} ? '#7251b5' : 'white'};
  font-size: 1.3rem;
  cursor: pointer;
`;

const MeditationHeader = styled.div`
  margin-bottom: 2rem;
`;

const Category = styled.div`
  display: inline-block;
  background: rgba(114, 81, 181, 0.3);
  color: #7251b5;
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  margin-bottom: 0.8rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const Scripture = styled.div`
  margin-bottom: 2rem;
`;

const Verse = styled.p`
  color: #a0a0c0;
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 0.5rem;
  line-height: 1.6;
`;

const Reference = styled.p`
  color: #7251b5;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: right;
`;

const Description = styled.div`
  color: #d0d0e0;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const PlayerContainer = styled.div`
  background: rgba(30, 30, 60, 0.6);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const PlayerTitle = styled.h3`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  text-align: center;
`;

// Timer Display (do seu código original)
const TimerDisplay = styled.div`
  color: white;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const PlayerControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

// Botões de controle (do seu código original)
const ControlButton = styled(motion.button)`
  background: ${props => props.$primary ? '#7251b5' : 'transparent'};
  border: ${props => props.$primary ? 'none' : '2px solid #7251b5'};
  width: ${props => props.$primary ? '60px' : '50px'};
  height: ${props => props.$primary ? '60px' : '50px'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.$primary ? '1.5rem' : '1.2rem'};
  cursor: pointer;
`;

const RelatedTitle = styled.h2`
  color: white;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const RelatedList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding-bottom: 1rem;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

const RelatedItem = styled(motion.div)`
  background: rgba(30, 30, 60, 0.4);
  border-radius: 12px;
  padding: 1rem;
  min-width: 200px;
  cursor: pointer;
`;

const RelatedItemTitle = styled.h3`
  color: white;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
`;

const RelatedScripture = styled.p`
  color: #7251b5;
  font-size: 0.8rem;
`;

// NavbarContainer e NavItem (mantenha como está)
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
const meditations = {
  'med1': { 
    id: 'med1', 
    title: 'Libertando-se da Ansiedade', 
    scripture: 'Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus.',
    reference: 'Filipenses 4:6-7',
    category: 'Ansiedade',
    duration: 900, // 15 minutos em segundos
    description: 'Esta meditação guiada ajuda a confrontar e superar sentimentos de ansiedade através das promessas de Deus. Aprenda a entregar suas preocupações em oração e a receber a paz divina que ultrapassa todo entendimento.',
    audioUrl: '/meditations/anxiety-relief.mp3'
  },
  'med2': { 
    id: 'med2', 
    title: 'Cultivando Gratidão Diária', 
    scripture: 'Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.',
    reference: '1 Tessalonicenses 5:18',
    category: 'Gratidão',
    duration: 600, // 10 minutos em segundos
    description: 'Aprenda a desenvolver um coração grato em todas as circunstâncias. Esta meditação o guiará em uma jornada para reconhecer as bênçãos de Deus em cada aspecto da sua vida, mesmo nos momentos difíceis.',
    audioUrl: '/meditations/daily-gratitude.mp3'
  }
};

const relatedMeditations = [
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

export default function MeditationDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [meditation, setMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Carregar dados da meditação quando o ID estiver disponível
  useEffect(() => {
    if (id && meditations[id]) {
      setMeditation(meditations[id]);
      setTimeRemaining(meditations[id].duration);
    }
  }, [id]);
  
  // Controlar o timer (do seu código original)
  useEffect(() => {
    let interval;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);
  
  // Formatação do tempo (do seu código original)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Função de reinício do timer (do seu código original)
  const resetTimer = () => {
    if (meditation) {
      setTimeRemaining(meditation.duration);
    }
    setIsPlaying(false);
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Toggle favorito
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // No futuro, aqui você salvaria/removeria dos favoritos no Firebase
  };
  
  // Função de compartilhamento (do seu código original)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: meditation?.title,
        text: 'Confira esta meditação no app Plenitude',
        url: window.location.href
      })
      .catch(err => console.error('Erro ao compartilhar:', err));
    } else {
      // Fallback para navegadores que não suportam Web Share API
      alert('Funcionalidade de compartilhamento não suportada neste navegador.');
    }
  };
  
  if (!meditation) {
    return <div>Carregando...</div>;
  }
  
  return (
    <>
      <Head>
        <title>{meditation.title} - Plenitude</title>
        <meta name="description" content={`Meditação cristã: ${meditation.title}`} />
      </Head>

      <Container>
        <Header>
          <BackButton onClick={() => router.back()}>
            <FaArrowLeft />
          </BackButton>
          <HeaderActions>
            <ActionButton 
              $active={isFavorite} 
              onClick={toggleFavorite}
            >
              <FaHeart />
            </ActionButton>
            <ActionButton onClick={handleShare}>
              <FaShare />
            </ActionButton>
          </HeaderActions>
        </Header>
        
        <MeditationHeader>
          <Category>{meditation.category}</Category>
          <Title>{meditation.title}</Title>
        </MeditationHeader>
        
        <Scripture>
          <Verse>"{meditation.scripture}"</Verse>
          <Reference>{meditation.reference}</Reference>
        </Scripture>
        
        <Description>
          {meditation.description}
        </Description>
        
        <PlayerContainer>
          <PlayerTitle>Meditação Guiada</PlayerTitle>
          <TimerDisplay>{formatTime(timeRemaining)}</TimerDisplay>
          <PlayerControls>
            <ControlButton 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              onClick={resetTimer}
            >
              <FaRedo />
            </ControlButton>
            <ControlButton 
              $primary={true}
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </ControlButton>
          </PlayerControls>
        </PlayerContainer>
        
        <RelatedTitle>Meditações Relacionadas</RelatedTitle>
        <RelatedList>
          {relatedMeditations.map(related => (
            <RelatedItem 
              key={related.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/meditation/${related.id}`)}
            >
              <RelatedItemTitle>{related.title}</RelatedItemTitle>
              <RelatedScripture>{related.scripture}</RelatedScripture>
            </RelatedItem>
          ))}
        </RelatedList>
        
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
          <NavItem onClick={() => router.push('/profile')}>
            <FaUser />
            <span>Perfil</span>
          </NavItem>
        </NavbarContainer>
      </Container>
    </>
  );
}
