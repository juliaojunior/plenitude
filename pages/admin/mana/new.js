// pages/admin/mana/new.js
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaTimes, FaCalendarAlt, FaUserCircle } from 'react-icons/fa';
import { addDailyMana } from '../../../lib/firestore';
import withAdminAuth from '../../../components/withAdminAuth';

// Estilos
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.8rem;
  flex: 1;
`;

// Adicione a definição do ProfileButton
const ProfileButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-left: auto;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-size: 1rem;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.8rem 1rem;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #7251b5;
  }
`;

const Textarea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.8rem 1rem;
  color: white;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #7251b5;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SaveButton = styled(Button)`
  background: #7251b5;
  color: white;
  border: none;
  
  &:hover:not(:disabled) {
    background: #8862d6;
  }
`;

const CancelButton = styled(Button)`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  background: rgba(46, 204, 113, 0.2);
  border: 1px solid rgba(46, 204, 113, 0.4);
  color: #2ecc71;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #2ecc71;
  font-size: 1.2rem;
  cursor: pointer;
`;

const DatePickerContainer = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.6);
    pointer-events: none;
  }
`;

function NewDailyMana() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    verse: '',
    reference: '',
    reflection: '',
    dateStr: formatDate(new Date())
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validação
      if (!formData.verse.trim()) {
        throw new Error('O versículo é obrigatório');
      }
      if (!formData.reference.trim()) {
        throw new Error('A referência é obrigatória');
      }
      if (!formData.reflection.trim()) {
        throw new Error('A reflexão é obrigatória');
      }
      
      await addDailyMana(formData);
      setSuccess(true);
      setFormData({
        verse: '',
        reference: '',
        reflection: '',
        dateStr: formatDate(new Date())
      });
      
    } catch (error) {
      console.error('Erro ao adicionar maná diário:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    router.push('/admin');
  };
  
  return (
    <>
      <Head>
        <title>Novo Maná Diário - Admin - Plenitude</title>
        <meta name="description" content="Adicionar um novo maná diário" />
      </Head>

      <Container>
        <Header>
          <BackButton onClick={() => router.push('/admin')}>
            <FaArrowLeft />
          </BackButton>
          <Title>Novo Maná Diário</Title>
          <ProfileButton onClick={() => router.push('/profile')}>
            <FaUserCircle />
            Meu Perfil
          </ProfileButton>
        </Header>
        
        {success && (
          <SuccessMessage>
            Maná diário adicionado com sucesso!
            <CloseButton onClick={() => setSuccess(false)}>
              <FaTimes />
            </CloseButton>
          </SuccessMessage>
        )}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="dateStr">Data</Label>
            <DatePickerContainer>
              <Input
                type="date"
                id="dateStr"
                name="dateStr"
                value={formData.dateStr}
                onChange={handleChange}
              />
              <FaCalendarAlt />
            </DatePickerContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="verse">Versículo</Label>
            <Textarea
              id="verse"
              name="verse"
              value={formData.verse}
              onChange={handleChange}
              placeholder="Ex: Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas..."
              rows={4}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="reference">Referência</Label>
            <Input
              type="text"
              id="reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder="Ex: Filipenses 4:6-7"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="reflection">Reflexão</Label>
            <Textarea
              id="reflection"
              name="reflection"
              value={formData.reflection}
              onChange={handleChange}
              placeholder="Escreva uma reflexão baseada no versículo..."
              rows={6}
            />
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <ButtonGroup>
            <CancelButton
              type="button"
              onClick={handleCancel}
              whileTap={{ scale: 0.95 }}
            >
              <FaTimes />
              Cancelar
            </CancelButton>
            
            <SaveButton
              type="submit"
              disabled={loading}
              whileTap={{ scale: loading ? 1 : 0.95 }}
            >
              <FaSave />
              {loading ? 'Salvando...' : 'Salvar'}
            </SaveButton>
          </ButtonGroup>
        </Form>
      </Container>
    </>
  );
}

// Exportar com proteção de admin
export default withAdminAuth(NewDailyMana);
