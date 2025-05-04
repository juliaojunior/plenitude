import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const CardContainer = styled(motion.div)`
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

const Title = styled.p`
  color: #fff;
  font-weight: 500;
  font-size: 0.95rem;
`;

export default function CategoryCard({ title, icon, color, slug }) {
  const router = useRouter();

  const handleClick = () => {
    if (slug) {
      router.push(`/category/${slug}`);
    }
  };

  return (
    
      
        {icon}
      
      {title}
    
  );
}
