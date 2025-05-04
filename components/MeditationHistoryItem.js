import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const ItemContainer = styled(motion.div)`
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

const MeditationDate = styled.span`
  color: #a0a0c0;
  font-size: 0.75rem;
`;

const MeditationDuration = styled.span`
  color: #a0a0c0;
  font-size: 0.75rem;
`;

export default function MeditationHistoryItem({ 
  id,
  title, 
  scripture, 
  date, 
  duration 
}) {
  const router = useRouter();

  const handleClick = () => {
    if (id) {
      router.push(`/meditation/${id}`);
    }
  };

  return (
    
      
        {title}
        {scripture}
      
      
      
        {date}
        {duration}
      
    
  );
}
