import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { 
  FaArrowLeft, FaPlay, FaPause, FaRedo, 
  FaBookmark, FaRegBookmark, FaShare 
} from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem;
  padding-bottom: 2rem;
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

const Title = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: auto;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  margin-left: 1rem;
  cursor: pointer;
`;

const ScriptureCard = styled.div`
  background: rgba(114, 81, 181, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(114, 81, 181, 0.3);
`;

const ScriptureText = styled.p`
  color: #d0d0e0;
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ScriptureReference = styled.p`
  color: #7251b5;
  font-size: 1rem;
  font-weight: 500;
  text-align: right;
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ContentText = styled.div`
  color: #a0a0c0;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 1rem;
  }
`;

const PlayerCard = styled.div`
  background: rgba(30, 30, 60, 0.6);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const PlayerTitle = styled.h3`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  text-align: center;
`;

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

const ControlButton = styled(motion.button)`
  background: ${props => props.primary ? '#7251b5' : 'transparent'};
  border: ${props => props.primary ? 'none' : '2px solid #7251b5'};
  width: ${props => props.primary ? '60px' : '50px'};
  height: ${props => props.primary ? '60px' : '50px'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.primary ? '1.5rem' : '1.2rem'};
  cursor: pointer;
`;

// Dados fictícios para as meditações
const meditations = {
  'anx1': {
    title: 'Entregando as preocupações',
    scripture: 'Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus.',
    reference: 'Filipenses 4:6-7',
    content: `
      A ansiedade frequentemente surge quando tentamos carregar pesos que não foram feitos para nós carregarmos sozinhos. Deus nos convida a entregar todas as nossas preocupações a Ele.
      
      Quando nos sentimos sobrecarregados, podemos trazer cada preocupação diante de Deus em oração. Não há problema pequeno demais ou grande demais para compartilharmos com Ele.
      
      Durante esta meditação, vamos praticar a entrega consciente de nossas preocupações através da oração, visualizando cada uma sendo colocada nas mãos de Deus.
    `,
    duration: 900 // 15 minutos em segundos
  },
  'grat1': {
    title: 'Contando as bênçãos',
    scripture: 'Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.',
    reference: '1 Tessalonicenses 5:18',
    content: `
      A gratidão é uma prática poderosa que transforma nossa perspectiva. Mesmo nas circunstâncias mais desafiadoras, podemos encontrar bênçãos para agradecer.
      
      Esta meditação nos guia através de um processo de reconhecimento das bênçãos em nossa vida - das mais óbvias às mais sutis e facilmente esquecidas.
      
      Ao praticar regularmente a contagem de bênçãos, treinamos nossa mente para notar o bem, cultivando um coração de contentamento e alegria.
    `,
    duration: 720 // 12 minutos em segundos
  }
};

export default function MeditationPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [meditation, setMeditation] = useState(null);
  
  // Carregar dados da meditação quando o ID estiver disponível
  useEffect(() => {
    if (id && meditations[id]) {
      setMeditation(meditations[id]);
      setTimeRemaining(meditations[id].duration);
    }
  }, [id]);

  // Controlar o timer
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return \`\${minutes}:\${remainingSeconds < 10 ? '0' : ''}\${remainingSeconds}\`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    if (meditation) {
      setTimeRemaining(meditation.duration);
    }
    setIsPlaying(false);
  };

  const toggleSaved = () => {
    setIsSaved(!isSaved);
  };

  const goBack = () => {
    router.back();
  };

  const shareMeditation = () => {
    if (navigator.share) {
      navigator.share({
        title: meditation?.title,
        text: 'Confira esta meditação no app Plenitude',
        url: window.location.href
      })
      .catch(err => console.error('Erro ao compartilhar:', err));
    }
  };

  if (!meditation) {
    return (
      
        
          Carregando meditação...
        
      
    );
  }

  return (
    <>
      
        {meditation.title} - Plenitude
        
      

      
        
          
            
          
          {meditation.title}
          
            {isSaved ?  : }
          
          
            
          
        

        
          {meditation.scripture}
          {meditation.reference}
        

        Reflexão
        

        
          Meditação Guiada
          {formatTime(timeRemaining)}
          
            
              
            
            
            
              {isPlaying ?  : }
            
          
        
      
    
  );
}
