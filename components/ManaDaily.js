import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ManaContainer = styled(motion.div)`
  background: rgba(114, 81, 181, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(114, 81, 181, 0.3);
`;

const ManaTitle = styled.h2`
  color: #fff;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const VersiculoContainer = styled.div`
  margin-bottom: 1rem;
`;

const Versiculo = styled.p`
  color: #a0a0c0;
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

const Referencia = styled.p`
  color: #7251b5;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: right;
`;

const ReflexaoTitle = styled.h3`
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ReflexaoText = styled.p`
  color: #d0d0e0;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ShareButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid rgba(114, 81, 181, 0.5);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #7251b5;
  font-size: 0.9rem;
  margin-top: 1rem;
  cursor: pointer;
`;

export default function ManaDaily({ verse, reference, reflection }) {
  return (
    
      Maná Diário
      
        "{verse}"
        {reference}
      
      
      Reflexão
      {reflection}
      
      
        Compartilhar
      
    
  );
}
