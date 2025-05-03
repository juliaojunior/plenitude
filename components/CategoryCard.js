import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 15px;
  padding: 1.2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.color || '#7251b5'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  color: #fff;
  margin-bottom: 0.3rem;
`;

export default function CategoryCard({ data }) {
  const { id, title, icon, color } = data;
  const router = useRouter();
  
  const handleClick = () => {
    // Navegar para a página da categoria quando implementada
    router.push(`/meditation/${id}`);
  };
  
  return (
    <Card
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <IconContainer color={color}>
        {icon}
      </IconContainer>
      <Title>{title}</Title>
    </Card>
  );
}
