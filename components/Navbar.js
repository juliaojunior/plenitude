import React from 'react';
import styled from 'styled-components';
import { FaHome, FaSearch, FaBookmark, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';

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
  transition: color 0.2s;

  span {
    font-size: 0.7rem;
    margin-top: 0.2rem;
  }

  &:hover {
    color: ${props => props.active ? '#7251b5' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

export default function Navbar() {
  const router = useRouter();
  const path = router.pathname;

  const isActive = (route) => {
    return path === route;
  };

  const navigate = (route) => {
    router.push(route);
  };

  return (
    
       navigate('/')} 
        active={isActive('/')}
      >
        
        Início
      
      
       navigate('/explore')} 
        active={isActive('/explore')}
      >
        
        Explorar
      
      
       navigate('/saved')} 
        active={isActive('/saved')}
      >
        
        Salvos
      
      
       navigate('/profile')} 
        active={isActive('/profile')}
      >
        
        Perfil
      
    
  );
}
