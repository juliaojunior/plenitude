import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaShareAlt } from 'react-icons/fa';

const CardContainer = styled(motion.div)`
  background: rgba(114, 81, 181, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #7251b5, #9173d9);
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    margin-left: 0.5rem;
  }
`;

const Verse = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  
  span {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    margin-left: 0.5rem;
  }
`;

const BibleText = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  font-style: italic;
  position: relative;
  padding-left: 1.5rem;
  
  &::before {
    content: '"';
    position: absolute;
    left: 0;
    top: 0;
    color: rgba(255, 255, 255, 0.5);
    font-size: 2rem;
  }
  
  &::after {
    content: '"';
    color: rgba(255, 255, 255, 0.5);
    font-size: 2rem;
    margin-left: 0.25rem;
    vertical-align: text-bottom;
  }
`;

const Meditation = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const ShareButton = styled(motion.button)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    color: #fff;
  }
`;

export default function ManaCard({ data }) {
  const { verse, text, meditation } = data;
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Maná Diário',
        text: `${verse} - ${text}\n\n${meditation}`,
        url: window.location.href,
      });
    } else {
      // Fallback para navegadores que não suportam a API Web Share
      alert('Compartilhe este versículo: ' + verse);
    }
  };
  
  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title>
        <FaQuoteLeft color="#7251b5" />
        <h3>Maná Diário</h3>
      </Title>
      
      <Verse>
        {verse}
      </Verse>
      
      <BibleText>
        {text}
      </BibleText>
      
      <Meditation>
        {meditation}
      </Meditation>
      
      <ShareButton 
        whileTap={{ scale: 0.9 }}
        onClick={handleShare}
      >
        <FaShareAlt />
      </ShareButton>
    </CardContainer>
  );
}
