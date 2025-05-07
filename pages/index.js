import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaBookmark, FaUser, FaBrain, FaHeart, FaDove, FaBook } from 'react-icons/fa';
import { useRouter } from 'next/router';
// Importações do Firebase (comente se ainda não estiver configurado)
// import { getDailyMana, getAllCategories, getMeditationHistory } from '../lib/firestore';

// Componentes estilizados
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem;
  padding-bottom: 5rem;
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
  z-index: 100;
`;

const NavItem = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.$active ? '#7251b5' : 'rgba(255, 255, 255, 0.6)'};
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

// Componentes adicionais que estavam faltando
const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: white;
  font-size: 1.2rem;
`;

const ErrorState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: #ff6b6b;
  font-size: 1.2rem;
  text-align: center;
  padding: 0 2rem;
`;

const EmptyMessage = styled.div`
  color: #a0a0c0;
  text-align: center;
  padding: 2rem;
  background: rgba(30, 30, 60, 0.4);
  border-radius: 12px;
  line-height: 1.5;
`;

// Componente funcional ManaDaily
const ManaDaily = ({ verse, reference, reflection }) => (
  <ManaContainer
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ManaTitle>Maná Diário</ManaTitle>
    <VersiculoContainer>
      <Versiculo>{verse || "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus."}</Versiculo>
      <Referencia>{reference || "Filipenses 4:6-7"}</Referencia>
    </VersiculoContainer>
    <ReflexaoTitle>Reflexão</ReflexaoTitle>
    <ReflexaoText>
      {reflection || "Mesmo nos momentos de maior tribulação, Deus nos convida a buscar refúgio Nele através da oração. Quando entregamos nossas preocupações a Deus, recebemos em troca uma paz que transcende nossa compreensão."}
    </ReflexaoText>
  </ManaContainer>
);

// Dados temporários (usados até implementar Firebase)
const categories = [
  { id: 'anxiety', title: 'Ansiedade', icon: <FaBrain />, color: '#7251b5' },
  { id: 'gratitude', title: 'Gratidão', icon: <FaHeart />, color: '#e74c3c' },
  { id: 'peace', title: 'Paz', icon: <FaDove />, color: '#3498db' },
  { id: 'wisdom', title: 'Sabedoria', icon: <FaBook />, color: '#f1c40f' }
];

const popularMeditations = [
  { 
    id: 'med1', 
    title: 'Libertando-se da Ansiedade', 
    scripture: 'Filipenses 4:6-7',
    category: 'Ansiedade',
    duration: '15 min',
    date: 'Hoje'
  },
  { 
    id: 'med2', 
    title: 'Cultivando Gratidão Diária', 
    scripture: '1 Tessalonicenses 5:18',
    category: 'Gratidão',
    duration: '10 min',
    date: 'Ontem'
  },
  { 
    id: 'med3', 
    title: 'Encontrando Paz em Meio à Tempestade', 
    scripture: 'João 14:27',
    category: 'Paz',
    duration: '20 min',
    date: '3 dias atrás'
  }
];

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // mude para true quando implementar Firebase
  const [error, setError] = useState(null);
  const [manaDaily, setManaDaily] = useState(null);
  const [meditationCategories, setMeditationCategories] = useState(categories);
  const [recentMeditations, setRecentMeditations] = useState(popularMeditations);
  
  /* Descomente quando implementar Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar o maná diário
        const mana = await getDailyMana();
        setManaDaily(mana);
        
        // Buscar categorias
        const cats = await getAllCategories();
        setMeditationCategories(cats.length > 0 ? cats : categories);
        
        // Buscar histórico recente
        const history = await getMeditationHistory(3);
        setRecentMeditations(history.length > 0 ? history : popularMeditations);
        
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Não foi possível carregar os dados.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  */
  
  return (
    <>
      <Head>
        <title>Plenitude - Meditação Cristã</title>
        <meta name="description" content="Aplicativo de meditação cristã para paz interior e reflexão" />
      </Head>

      <Container>
        {loading ? (
          <LoadingState>Carregando...</LoadingState>
        ) : error ? (
          <ErrorState>{error}</ErrorState>
        ) : (
          <>
            {/* Maná Diário */}
            <ManaDaily 
              verse={manaDaily?.verse}
              reference={manaDaily?.reference}
              reflection={manaDaily?.reflection}
            />
            
            {/* Seção Categorias */}
            <Section>
              <SectionTitle>Categorias</SectionTitle>
              <CategoryGrid>
                {meditationCategories.map(category => (
                  <CategoryCard 
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(`/category/${category.id}`)}
                  >
                    <IconBackground color={category.color}>
                      {category.icon}
                    </IconBackground>
                    <CategoryTitle>{category.title}</CategoryTitle>
                  </CategoryCard>
                ))}
              </CategoryGrid>
            </Section>
            
            {/* Últimas Meditações */}
            <Section>
              <SectionTitle>Últimas Meditações</SectionTitle>
              {recentMeditations.length > 0 ? (
                <MeditationList>
                  {recentMeditations.map(meditation => (
                    <MeditationItem
                      key={meditation.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push(`/meditation/${meditation.id}`)}
                    >
                      <MeditationInfo>
                        <MeditationTitle>{meditation.title}</MeditationTitle>
                        <MeditationScripture>{meditation.scripture}</MeditationScripture>
                      </MeditationInfo>
                      <MeditationMeta>
                        <MeditationDate>{meditation.date}</MeditationDate>
                        <MeditationDuration>{meditation.duration}</MeditationDuration>
                      </MeditationMeta>
                    </MeditationItem>
                  ))}
                </MeditationList>
              ) : (
                <EmptyMessage>
                  Ainda não há histórico de meditações. Comece sua jornada hoje!
                </EmptyMessage>
              )}
            </Section>
            
            {/* Navbar */}
            <NavbarContainer>
              <NavItem $active={true}>
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
          </>
        )}
      </Container>
    </>
  );
}
