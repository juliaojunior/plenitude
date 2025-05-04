import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaBrain, FaHeart, FaDove, FaBook } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

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

const CategoryTitle = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

const CategoryIcon = styled.div`
  width: 100%;
  height: 150px;
  background: rgba(30, 30, 60, 0.4);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 3rem;
  color: ${props => props.color || '#7251b5'};
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const MeditationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MeditationItem = styled(motion.div)`
  background: rgba(30, 30, 60, 0.4);
  border-radius: 12px;
  padding: 1.2rem;
  cursor: pointer;
`;

const MeditationTitle = styled.h3`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const MeditationDescription = styled.p`
  color: #a0a0c0;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  line-height: 1.4;
`;

const MeditationMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MeditationScripture = styled.span`
  color: #7251b5;
  font-size: 0.8rem;
`;

const MeditationDuration = styled.span`
  color: #a0a0c0;
  font-size: 0.8rem;
`;

// Função para obter o ícone e cor baseado no slug
const getCategoryDetails = (slug) => {
  switch (slug) {
    case 'ansiedade':
      return { 
        icon: , 
        color: '#7251b5',
        title: 'Ansiedade'
      };
    case 'gratidao':
      return { 
        icon: , 
        color: '#5167e4',
        title: 'Gratidão'
      };
    case 'paz':
      return { 
        icon: , 
        color: '#5e72e4',
        title: 'Paz'
      };
    case 'sabedoria':
      return { 
        icon: , 
        color: '#8862d6',
        title: 'Sabedoria'
      };
    default:
      return { 
        icon: , 
        color: '#7251b5',
        title: 'Categoria'
      };
  }
};

// Dados fictícios para as meditações
const categoryMeditations = {
  ansiedade: [
    {
      id: 'anx1',
      title: 'Entregando as preocupações',
      description: 'Aprenda a entregar suas preocupações a Deus e encontrar paz em meio à ansiedade.',
      scripture: 'Filipenses 4:6-7',
      duration: '15 min'
    },
    {
      id: 'anx2',
      title: 'Respiração e presença',
      description: 'Prática de respiração consciente enquanto medita na presença de Deus.',
      scripture: 'Salmos 46:10',
      duration: '10 min'
    },
    {
      id: 'anx3',
      title: 'Superando o medo',
      description: 'Meditação guiada para vencer o medo e a ansiedade através das promessas de Deus.',
      scripture: 'Isaías 41:10',
      duration: '20 min'
    }
  ],
  gratidao: [
    {
      id: 'grat1',
      title: 'Contando as bênçãos',
      description: 'Prática de gratidão diária reconhecendo as bênçãos em sua vida.',
      scripture: '1 Tessalonicenses 5:18',
      duration: '12 min'
    }
  ],
  paz: [
    {
      id: 'paz1',
      title: 'Paz que excede entendimento',
      description: 'Meditação sobre a paz que vem de Deus e transcende as circunstâncias.',
      scripture: 'João 14:27',
      duration: '15 min'
    }
  ],
  sabedoria: [
    {
      id: 'sab1',
      title: 'Sabedoria para decisões',
      description: 'Meditação para buscar a sabedoria de Deus nas decisões importantes.',
      scripture: 'Tiago 1:5',
      duration: '18 min'
    }
  ]
};

export default function Category() {
  const router = useRouter();
  const { slug } = router.query;
  
  const { icon, color, title } = getCategoryDetails(slug);
  const meditations = slug ? (categoryMeditations[slug] || []) : [];

  const goBack = () => {
    router.back();
  };

  const openMeditation = (id) => {
    router.push(`/meditation/${id}`);
  };

  return (
    <>
      
        {title} - Plenitude
        
      

      
        
          
            
          
          {title}
        

        
          {icon}
        

        Meditações Disponíveis
        
          {meditations.length > 0 ? (
            meditations.map((item) => (
               openMeditation(item.id)}
              >
                {item.title}
                {item.description}
                
                  {item.scripture}
                  {item.duration}
                
              
            ))
          ) : (
            
              Carregando meditações...
            
          )}
        

        
      
    
  );
}
