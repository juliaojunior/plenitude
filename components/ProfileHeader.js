import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 3px solid #7251b5;
  margin-right: 1.5rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.3rem;
`;

const Email = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;

const EditButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #fff;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export default function ProfileHeader({ name, email, image }) {
  return (
    <Header>
      <Avatar>
        <Image 
          src={image} 
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Avatar>
      
      <UserInfo>
        <Name>{name}</Name>
        <Email>{email}</Email>
        <EditButton
          whileTap={{ scale: 0.95 }}
        >
          Editar perfil
        </EditButton>
      </UserInfo>
    </Header>
  );
}
