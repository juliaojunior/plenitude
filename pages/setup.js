// pages/setup.js
import { useState } from 'react';
import { addCategory } from '../lib/firestore';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Button = styled.button`
  background: #7251b5;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Status = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: ${props => props.success ? 'rgba(46, 204, 113, 0.2)' : 'rgba(231, 76, 60, 0.2)'};
  border-radius: 8px;
  color: ${props => props.success ? '#2ecc71' : '#e74c3c'};
`;

export default function Setup() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const addInitialCategories = async () => {
    setLoading(true);
    setStatus('Iniciando adição de categorias...');
    
    const categories = [
      { 
        name: 'Ansiedade', 
        description: 'Meditações para aliviar a ansiedade e encontrar calma em Deus',
        color: '#7251b5',
        icon: 'brain'
      },
      { 
        name: 'Gratidão', 
        description: 'Práticas para desenvolver um coração grato em todas as circunstâncias',
        color: '#e74c3c',
        icon: 'heart'
      },
      { 
        name: 'Paz', 
        description: 'Encontre paz interior através das promessas de Deus',
        color: '#3498db',
        icon: 'dove'
      },
      { 
        name: 'Sabedoria', 
        description: 'Meditações baseadas nos livros de sabedoria da Bíblia',
        color: '#f1c40f',
        icon: 'book'
      },
      { 
        name: 'Sono', 
        description: 'Meditações para relaxar e preparar para uma noite de descanso',
        color: '#9b59b6',
        icon: 'moon'
      },
      { 
        name: 'Foco', 
        description: 'Práticas para desenvolver concentração e clareza mental',
        color: '#2ecc71',
        icon: 'bullseye'
      }
    ];
    
    try {
      for (const category of categories) {
        setStatus(`Adicionando categoria '${category.name}'...`);
        await addCategory(category);
        setStatus(`Categoria '${category.name}' adicionada com sucesso!`);
      }
      
      setStatus('Todas as categorias iniciais foram adicionadas com sucesso!');
      setSuccess(true);
    } catch (error) {
      console.error('Erro ao adicionar categorias:', error);
      setStatus(`Erro: ${error.message}`);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <h1>Configuração Inicial do Aplicativo</h1>
      
      <h2>1. Adicionar Categorias Iniciais</h2>
      <p>Clique no botão abaixo para adicionar as categorias iniciais ao Firestore:</p>
      <Button 
        onClick={addInitialCategories}
        disabled={loading}
      >
        {loading ? 'Adicionando...' : 'Adicionar Categorias Iniciais'}
      </Button>
      
      {status && (
        <Status success={success}>
          {status}
        </Status>
      )}
    </Container>
  );
}
