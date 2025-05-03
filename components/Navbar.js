import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaHeart, FaUser } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(26, 26, 46, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-around;
  padding: 0.8rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
`;

const NavItem = styled(motion.button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  color: ${props => props.active ? '#7251b5' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 0.7rem;
  cursor: pointer;
  transition: color 0.3s;
  
  svg {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
  }
`;

export default function Navbar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('/');
  
  const handleNavigation = (path) => {
    setActiveTab(path);
    router.push(path);
  };
  
  return (
    <NavbarContainer>
      <NavItem
        whileTap={{ scale: 0.9 }}
        active={activeTab === '/'}
        onClick={() => handleNavigation('/')}
      >
        <FaHome />
        <span>Início</span>
      </NavItem>
      
      <NavItem
        whileTap={{ scale: 0.9 }}
        active={activeTab === '/discover'}
        onClick={() => handleNavigation('/discover')}
      >
        <FaSearch />
        <span>Descobrir</span>
      </NavItem>
      
      <NavItem
        whileTap={{ scale: 0.9 }}
        active={activeTab === '/favorites'}
        onClick={() => handleNavigation('/favorites')}
      >
        <FaHeart />
        <span>Favoritos</span>
      </NavItem>
      
      <NavItem
        whileTap={{ scale: 0.9 }}
        active={activeTab === '/profile'}
        onClick={() => handleNavigation('/profile')}
      >
        <FaUser />
        <span>Perfil</span>
      </NavItem>
    </NavbarContainer>
  );
}
