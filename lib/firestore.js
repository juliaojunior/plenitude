// lib/firestore.js
import { db, auth } from './firebase';
import { 
  collection, doc, setDoc, getDoc, getDocs, 
  query, where, addDoc, deleteDoc, updateDoc,
  serverTimestamp, orderBy, limit
} from 'firebase/firestore';

// ----- CATEGORIAS -----

/**
 * Adicionar uma nova categoria
 */
export const addCategory = async (categoryData) => {
  try {
    const categoriesRef = collection(db, 'categories');
    const docRef = await addDoc(categoriesRef, {
      ...categoryData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar categoria:', error);
    throw error;
  }
};

/**
 * Buscar todas as categorias
 */
export const getAllCategories = async () => {
  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, orderBy('name'));
    
    const querySnapshot = await getDocs(q);
    const categories = [];
    
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return categories;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
};

// ----- MEDITAÇÕES -----

/**
 * Adicionar uma nova meditação
 */
export const addMeditation = async (meditationData) => {
  try {
    const meditationsRef = collection(db, 'meditations');
    const docRef = await addDoc(meditationsRef, {
      ...meditationData,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser ? auth.currentUser.uid : null
    });
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar meditação:', error);
    throw error;
  }
};

/**
 * Buscar meditação por ID
 */
export const getMeditationById = async (meditationId) => {
  try {
    const meditationRef = doc(db, 'meditations', meditationId);
    const meditationSnap = await getDoc(meditationRef);
    
    if (meditationSnap.exists()) {
      return {
        id: meditationSnap.id,
        ...meditationSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar meditação:', error);
    return null;
  }
};

/**
 * Buscar meditações por categoria
 */
export const getMeditationsByCategory = async (categoryId) => {
  try {
    const meditationsRef = collection(db, 'meditations');
    const q = query(meditationsRef, where('categoryId', '==', categoryId));
    
    const querySnapshot = await getDocs(q);
    const meditations = [];
    
    querySnapshot.forEach((doc) => {
      meditations.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return meditations;
  } catch (error) {
    console.error('Erro ao buscar meditações por categoria:', error);
    return [];
  }
};

/**
 * Buscar meditações populares
 */
export const getPopularMeditations = async (limitCount = 5) => {
  try {
    // Em uma implementação real, você classificaria por número de visualizações ou completações
    const meditationsRef = collection(db, 'meditations');
    const q = query(meditationsRef, limit(limitCount));
    
    const querySnapshot = await getDocs(q);
    const meditations = [];
    
    querySnapshot.forEach((doc) => {
      meditations.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return meditations;
  } catch (error) {
    console.error('Erro ao buscar meditações populares:', error);
    return [];
  }
};

// ----- FAVORITOS -----

/**
 * Adicionar meditação aos favoritos
 */
export const addToFavorites = async (meditationId) => {
  if (!auth.currentUser) throw new Error('Usuário não autenticado');
  
  try {
    const userId = auth.currentUser.uid;
    
    // Verificar se já está nos favoritos
    const favoritesRef = collection(db, 'favorites');
    const q = query(
      favoritesRef, 
      where('userId', '==', userId),
      where('meditationId', '==', meditationId)
    );
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Já está nos favoritos
      return querySnapshot.docs[0].id;
    }
    
    // Adicionar aos favoritos
    const docRef = await addDoc(favoritesRef, {
      userId,
      meditationId,
      createdAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar aos favoritos:', error);
    throw error;
  }
};

/**
 * Remover meditação dos favoritos
 */
export const removeFromFavorites = async (meditationId) => {
  if (!auth.currentUser) throw new Error('Usuário não autenticado');
  
  try {
    const userId = auth.currentUser.uid;
    const favoritesRef = collection(db, 'favorites');
    
    const q = query(
      favoritesRef, 
      where('userId', '==', userId),
      where('meditationId', '==', meditationId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return false; // Não estava nos favoritos
    }
    
    // Remover dos favoritos
    await deleteDoc(doc(db, 'favorites', querySnapshot.docs[0].id));
    
    return true;
  } catch (error) {
    console.error('Erro ao remover dos favoritos:', error);
    throw error;
  }
};

/**
 * Verificar se meditação está nos favoritos
 */
export const isFavorite = async (meditationId) => {
  if (!auth.currentUser) return false;
  
  try {
    const userId = auth.currentUser.uid;
    const favoritesRef = collection(db, 'favorites');
    
    const q = query(
      favoritesRef, 
      where('userId', '==', userId),
      where('meditationId', '==', meditationId)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    return false;
  }
};

/**
 * Buscar favoritos do usuário
 */
export const getUserFavorites = async () => {
  if (!auth.currentUser) throw new Error('Usuário não autenticado');
  
  try {
    const userId = auth.currentUser.uid;
    const favoritesRef = collection(db, 'favorites');
    
    const q = query(
      favoritesRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    // Extrair IDs de meditações
    const meditationIds = querySnapshot.docs.map(doc => doc.data().meditationId);
    
    // Buscar detalhes das meditações
    const meditationsPromises = meditationIds.map(id => getMeditationById(id));
    const meditations = await Promise.all(meditationsPromises);
    
    // Combinar com os dados de favoritos
    return querySnapshot.docs.map((doc, index) => ({
      favoriteId: doc.id,
      savedAt: doc.data().createdAt,
      ...meditations[index]
    }));
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return [];
  }
};

// ----- HISTÓRICO DE MEDITAÇÕES -----

/**
 * Registrar meditação completada
 */
export const logCompletedMeditation = async (meditationId, durationMinutes) => {
  if (!auth.currentUser) throw new Error('Usuário não autenticado');
  
  try {
    const userId = auth.currentUser.uid;
    
    // Adicionar ao histórico
    const historyRef = collection(db, 'meditation_history');
    const docRef = await addDoc(historyRef, {
      userId,
      meditationId,
      durationMinutes,
      completedAt: serverTimestamp()
    });
    
    // Atualizar estatísticas do usuário
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      
      await updateDoc(userRef, {
        meditationCount: (userData.meditationCount || 0) + 1,
        totalMinutes: (userData.totalMinutes || 0) + durationMinutes,
        lastMeditationAt: serverTimestamp()
      });
    }
    
    return docRef.id;
  } catch (error) {
    console.error('Erro ao registrar meditação completada:', error);
    throw error;
  }
};

/**
 * Buscar histórico de meditações do usuário
 */
export const getMeditationHistory = async (limitCount = 10) => {
  if (!auth.currentUser) throw new Error('Usuário não autenticado');
  
  try {
    const userId = auth.currentUser.uid;
    const historyRef = collection(db, 'meditation_history');
    
    const q = query(
      historyRef, 
      where('userId', '==', userId),
      orderBy('completedAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    
    // Extrair IDs de meditações
    const meditationIds = querySnapshot.docs.map(doc => doc.data().meditationId);
    
    // Buscar detalhes das meditações
    const meditationsPromises = meditationIds.map(id => getMeditationById(id));
    const meditations = await Promise.all(meditationsPromises);
    
    // Combinar com os dados de histórico
    return querySnapshot.docs.map((doc, index) => ({
      historyId: doc.id,
      completedAt: doc.data().completedAt,
      durationMinutes: doc.data().durationMinutes,
      ...meditations[index]
    }));
  } catch (error) {
    console.error('Erro ao buscar histórico de meditações:', error);
    return [];
  }
};

// ----- MANÁ DIÁRIO -----

/**
 * Adicionar novo maná diário
 */
export const addDailyMana = async (manaData) => {
  try {
    // Verificar se já existe maná para esta data
    const manaRef = collection(db, 'daily_mana');
    const q = query(manaRef, where('dateStr', '==', manaData.dateStr));
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Atualizar maná existente
      await updateDoc(doc(db, 'daily_mana', querySnapshot.docs[0].id), {
        ...manaData,
        updatedAt: serverTimestamp()
      });
      
      return querySnapshot.docs[0].id;
    } else {
      // Adicionar novo maná
      const docRef = await addDoc(manaRef, {
        ...manaData,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser ? auth.currentUser.uid : null
      });
      
      return docRef.id;
    }
  } catch (error) {
    console.error('Erro ao adicionar maná diário:', error);
    throw error;
  }
};

/**
 * Buscar maná diário para hoje
 */
export const getDailyMana = async () => {
  try {
    // Obter data de hoje
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // formato YYYY-MM-DD
    
    // Buscar maná para hoje
    const manaRef = collection(db, 'daily_mana');
    const q = query(manaRef, where('dateStr', '==', dateStr));
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Retornar maná de hoje
      return {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data()
      };
    } else {
      // Buscar maná mais recente
      const recentQ = query(manaRef, orderBy('createdAt', 'desc'), limit(1));
      const recentSnapshot = await getDocs(recentQ);
      
      if (!recentSnapshot.empty) {
        return {
          id: recentSnapshot.docs[0].id,
          ...recentSnapshot.docs[0].data()
        };
      }
      
      // Retornar maná padrão se não encontrar nenhum
      return {
        id: 'default',
        verse: 'Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.',
        reference: 'Filipenses 4:6',
        reflection: 'Entregue suas preocupações a Deus em oração. Ele ouve, Ele se importa, e Ele responde.',
        dateStr: dateStr
      };
    }
  } catch (error) {
    console.error('Erro ao buscar maná diário:', error);
    throw error;
  }
};

// ----- ADMINISTRAÇÃO -----

/**
 * Verificar se usuário é administrador
 */
export const isAdmin = async () => {
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
 * Adicionar usuário como administrador
 * NOTA: Esta função deve ser chamada apenas por um admin existente
 */
export const addAdmin = async (userId) => {
  if (!auth.currentUser) throw new Error('Usuário não autenticado');
  
  // Verificar se o usuário atual é admin
  const isCurrentUserAdmin = await isAdmin();
  if (!isCurrentUserAdmin) {
    throw new Error('Permissão negada: apenas administradores podem adicionar outros administradores');
  }
  
  try {
    const adminRef = doc(db, 'admins', userId);
    await setDoc(adminRef, {
      addedBy: auth.currentUser.uid,
      addedAt: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error('Erro ao adicionar administrador:', error);
    throw error;
  }
};

/**
 * Obter estatísticas do aplicativo
 */
export const getAppStats = async () => {
  try {
    // Verificar se é admin
    const isUserAdmin = await isAdmin();
    if (!isUserAdmin) {
      throw new Error('Permissão negada: apenas administradores podem acessar estatísticas');
    }
    
    // Total de usuários
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    const totalUsers = usersSnapshot.size;
    
    // Total de meditações
    const meditationsRef = collection(db, 'meditations');
    const meditationsSnapshot = await getDocs(meditationsRef);
    const totalMeditations = meditationsSnapshot.size;
    
    // Total de sessões
    const historyRef = collection(db, 'meditation_history');
    const historySnapshot = await getDocs(historyRef);
    const totalSessions = historySnapshot.size;
    
    // Total de minutos
    let totalMinutes = 0;
    historySnapshot.forEach(doc => {
      const data = doc.data();
      totalMinutes += data.durationMinutes || 0;
    });
    
    return {
      totalUsers,
      totalMeditations,
      totalSessions,
      totalMinutes,
      fetchedAt: new Date()
    };
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    throw error;
  }
};
