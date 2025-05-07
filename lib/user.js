// lib/user.js
import { db, auth } from './firebase';
import { 
  doc, getDoc, setDoc, updateDoc, 
  serverTimestamp, collection, query, where, getDocs 
} from 'firebase/firestore';

/**
 * Cria ou atualiza o perfil do usuário no Firestore
 */
export const createUserProfile = async (user) => {
  if (!user) return null;
  
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    // Primeiro login - criar novo perfil
    const userData = {
      displayName: user.displayName || '',
      email: user.email,
      photoURL: user.photoURL || '',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      streakCount: 0,
      meditationCount: 0,
      totalMinutes: 0,
      // Valores padrão para configurações
      preferences: {
        notifications: true,
        dailyReminder: true,
        reminderTime: '07:00',
        darkMode: true
      }
    };
    
    try {
      await setDoc(userRef, userData);
      console.log('Perfil de usuário criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar perfil de usuário:', error);
      throw error;
    }
  } else {
    // Login recorrente - atualizar último login
    try {
      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
        // Atualizar informações que podem ter mudado
        displayName: user.displayName || userSnap.data().displayName,
        photoURL: user.photoURL || userSnap.data().photoURL
      });
    } catch (error) {
      console.error('Erro ao atualizar último login:', error);
    }
  }
  
  return userRef;
};

/**
 * Obter perfil do usuário atual
 */
export const getCurrentUser = async () => {
  if (!auth.currentUser) return null;
  
  try {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return {
        id: userSnap.id,
        ...userSnap.data()
      };
    } else {
      // Criar perfil caso não exista
      await createUserProfile(auth.currentUser);
      const newUserSnap = await getDoc(userRef);
      return {
        id: newUserSnap.id,
        ...newUserSnap.data()
      };
    }
  } catch (error) {
    console.error('Erro ao obter perfil do usuário:', error);
    return null;
  }
};

/**
 * Atualizar perfil do usuário
 */
export const updateUserProfile = async (data) => {
  if (!auth.currentUser) return false;
  
  try {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return false;
  }
};

/**
 * Verificar se o usuário é administrador
 */
export const isUserAdmin = async () => {
  if (!auth.currentUser) return false;
  
  try {
    const adminRef = doc(db, 'admins', auth.currentUser.uid);
    const adminSnap = await getDoc(adminRef);
    return adminSnap.exists();
  } catch (error) {
    console.error('Erro ao verificar permissões de admin:', error);
    return false;
  }
};

/**
 * Atualizar configurações do usuário
 */
export const updateUserPreferences = async (preferences) => {
  if (!auth.currentUser) return false;
  
  try {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, {
      'preferences': preferences,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Erro ao atualizar preferências:', error);
    return false;
  }
};
