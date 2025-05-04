import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBook, FaHeart, FaBrain, FaDove, FaHome, FaSearch, FaBookmark, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router'; // Adicionei importação do router

// Componentes estilizados
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem;
  padding-bottom: 5rem; // Espaço para a navbar
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

// Componente Maná Diário
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

// Componentes para Categorias
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const CategoryCard = styled(motion.div)`
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

const CategoryTitle = styled.p`
  color: #fff;
  font-weight: 500;
  font-size: 0.95rem;
`;

// Componentes para Meditações Recentes
const MeditationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MeditationItem = styled(motion.div)`
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

// Componente Navbar
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

  span {
    font-size: 0.7rem;
    margin-top: 0.2rem;
  }
`;

// Componentes funcionais corrigidos
const ManaDaily = ({ verse, reference, reflection }) => (
  <ManaContainer
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ManaTitle>Maná Diário</ManaTitle>
    <VersiculoContainer>
      <Versiculo>"{verse}"</Versiculo>
      <Referencia>{reference}</Referencia>
    </VersiculoContainer>
    <ReflexaoTitle>Reflexão</ReflexaoTitle>
    <ReflexaoText>{reflection}</ReflexaoText>
  </ManaContainer>
);

export default function Home() {
  const router = useRouter(); // Adicionei o router
  
  return (
    <>
      <Head>
        <title>Plenitude - Meditação Cristã</title>
        <meta name="description" content="Aplicativo de meditação cristã para paz interior" />
      </Head>

      <Container>
        <ManaDaily 
          verse="Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus."
          reference="Filipenses 4:6-7"
          reflection="Mesmo nos momentos de maior tribulação, Deus nos convida a buscar refúgio Nele através da oração. Quando entregamos nossas preocupações a Deus, recebemos em troca uma paz que transcende nossa compreensão."
        />
        
        <Section>
          <SectionTitle>Categorias</SectionTitle>
          <CategoryGrid>
            <CategoryCard 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconBackground color="#7251b5">
                <FaBrain />
              </IconBackground>
              <CategoryTitle>Ansiedade</CategoryTitle>
            </CategoryCard>
            
            <CategoryCard 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconBackground color="#e74c3c">
                <FaHeart />
              </IconBackground>
              <CategoryTitle>Gratidão</CategoryTitle>
            </CategoryCard>
            
            <CategoryCard 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconBackground color="#3498db">
                <FaDove />
              </IconBackground>
              <CategoryTitle>Paz</CategoryTitle>
            </CategoryCard>
            
            <CategoryCard 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconBackground color="#f1c40f">
                <FaBook />
              </IconBackground>
              <CategoryTitle>Sabedoria</CategoryTitle>
            </CategoryCard>
          </CategoryGrid>
        </Section>
        
        <Section>
          <SectionTitle>Últimas Meditações</SectionTitle>
          <MeditationList>
            <MeditationItem
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MeditationInfo>
                <MeditationTitle>Confiança em Deus</MeditationTitle>
                <MeditationScripture>Salmos 23</MeditationScripture>
              </MeditationInfo>
              <MeditationMeta>
                <MeditationDate>Hoje</MeditationDate>
                <MeditationDuration>15 min</MeditationDuration>
              </MeditationMeta>
            </MeditationItem>
            
            <MeditationItem
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MeditationInfo>
                <MeditationTitle>Gratidão Diária</MeditationTitle>
                <MeditationScripture>1 Tessalonicenses 5:18</MeditationScripture>
              </MeditationInfo>
              <MeditationMeta>
                <MeditationDate>Ontem</MeditationDate>
                <MeditationDuration>10 min</MeditationDuration>
              </MeditationMeta>
            </MeditationItem>
            
            <MeditationItem
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MeditationInfo>
                <MeditationTitle>Superando o Medo</MeditationTitle>
                <MeditationScripture>Isaías 41:10</MeditationScripture>
              </MeditationInfo>
              <MeditationMeta>
                <MeditationDate>3 dias atrás</MeditationDate>
                <MeditationDuration>20 min</MeditationDuration>
              </MeditationMeta>
            </MeditationItem>
          </MeditationList>
        </Section>
        
        <NavbarContainer>
          <NavItem active>
            <FaHome />
            <span>Início</span>
          </NavItem>
          <NavItem onClick={() => router.push('/explore')}>
            <FaSearch />
            <span>Explorar</span>
          </NavItem>
          <NavItem onClick={() => router.push('/saved')}>
            <FaBookmark />
            <span>Salvos</span>
          </NavItem>
          <NavItem onClick={() => router.push('/profile')}>
            <FaUser />
            <span>Perfil</span>
          </NavItem>
        </NavbarContainer>
      </Container>
    </>
  );
}
