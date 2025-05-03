import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlay, FaClock } from 'react-icons/fa';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const PlayButton = styled.div`
  width: 40px;
  height: 40px;
  background: #7251b5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
  
  svg {
    color: white;
    margin-left: 3px; // Ajuste para centralizar visualmente o ícone de play
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 1rem;
  color: white;
  margin-bottom: 0.3rem;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  
  .duration {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    
    svg {
      margin-right: 0.3rem;
      font-size: 0.8rem;
    }
  }
`;

export default function MeditationHistoryCard({ data }) {
  const { title, duration, date } = data;
  
  return (
    <Card
      whileTap={{ scale: 0.98 }}
    >
      <PlayButton>
        <FaPlay />
      </PlayButton>
      
      <Info>
        <Title>{title}</Title>
        <Meta>
          <span className="duration">
            <FaClock />
            {duration}
          </span>
          <span>{date}</span>
        </Meta>
      </Info>
    </Card>
  );
}
