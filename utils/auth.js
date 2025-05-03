import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Hook para proteger rotas que exigem autenticação
export function useRequireAuth(redirectTo = '/login') {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push(redirectTo);
  }, [session, status, router, redirectTo]);
  
  return { session, status };
}

// Função para verificar se o usuário tem determinadas permissões (para uso futuro)
export function hasPermission(user, permission) {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
}

// Função para obter o nome de exibição do usuário
export function getUserDisplayName(user) {
  if (!user) return '';
  return user.name || user.email.split('@')[0] || 'Usuário';
}

// Função para obter avatar padrão se o usuário não tiver imagem
export function getUserAvatar(user) {
  if (!user) return '/images/default-avatar.png';
  return user.image || '/images/default-avatar.png';
}

// Função para verificar se o token está expirado
export function isTokenExpired(expiresAt) {
  if (!expiresAt) return true;
  return new Date(expiresAt) < new Date();
}

// Função para persistir dados do usuário localmente (com cautela)
export function persistUserData(userData) {
  if (typeof window === 'undefined') return;
  
  // Nunca armazene dados sensíveis como senhas ou tokens completos
  const safeUserData = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    lastLogin: new Date().toISOString(),
  };
  
  try {
    localStorage.setItem('user_preferences', JSON.stringify(safeUserData));
  } catch (error) {
    console.error('Erro ao persistir dados do usuário:', error);
  }
}

// Função para recuperar dados persistidos
export function getSavedUserPreferences() {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = localStorage.getItem('user_preferences');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao recuperar preferências do usuário:', error);
    return null;
  }
}
