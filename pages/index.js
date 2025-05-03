import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ManaCard from '../components/ManaCard';
import CategoryCard from '../components/CategoryCard';
import MeditationHistoryCard from '../components/MeditationHistoryCard';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
`;

const Content = styled.div`
  padding: 1.5rem;
  padding-bottom: 5rem; // Espaço para a navbar
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: #fff;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dailyMana, setDailyMana] = useState(null);
  const [categories, setCategories] = useState([]);
  const [history, setHistory] = useState([]);
  
  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Carregar dados simulados
  useEffect(() => {
    if (status === 'authenticated') {
      // Dados simulados para maná diário
      setDailyMana({
        verse: 'Filipenses 4:7',
        text: 'E a paz de Deus, que excede todo o entendimento, guardará os seus corações e as suas mentes em Cristo Jesus.',
        meditation: 'A paz que Deus nos oferece vai além da compreensão humana. Ela não depende das circunstâncias, mas da nossa conexão com Cristo Jesus.'
      });

      // Dados simulados para categorias
      setCategories([
        { id: 1, title: 'Ansiedade', icon: '🧠', color: '#7251b5' },
        { id: 2, title: 'Gratidão', icon: '🙏', color: '#4361ee' },
        { id: 3, title: 'Perdão', icon: '❤️', color: '#f72585' },
        { id: 4, title: 'Esperança', icon: '✨', color: '#4cc9f0' }
      ]);

      // Dados simulados para histórico
      setHistory([
        { id: 1, title: 'Ansiedade - Meditação guiada', duration: '10 min', date: 'Hoje' },
        { id: 2, title: 'Salmo 23', duration: '5 min', date: 'Ontem' },
        { id: 3, title: 'Gratidão pela manhã', duration: '8 min', date: '3 dias atrás' }
      ]);
    }
  }, [status]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <Container>
        <Head>
          <title>Carregando - Plenitude </title>
        </Head>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100vh'
        }}>
          Carregando...
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Head>
        <title>Início - Plenitude</title>
        <meta name="description" content="Aplicativo de meditação com foco em crenças cristãs" />
      </Head>
      
      <Content>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {dailyMana && <ManaCard data={dailyMana} />}
          
          <SectionTitle>Categorias</SectionTitle>
          <CategoriesGrid>
            {categories.map((category) => (
              <CategoryCard key={category.id} data={category} />
            ))}
          </CategoriesGrid>
          
          <SectionTitle>Suas últimas meditações</SectionTitle>
          <HistoryList>
            {history.map((item) => (
              <MeditationHistoryCard key={item.id} data={item} />
            ))}
          </HistoryList>
        </motion.div>
      </Content>
      
      <Navbar />
    </Container>
  );
}
