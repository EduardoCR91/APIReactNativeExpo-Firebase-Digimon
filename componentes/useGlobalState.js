import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, deleteDoc, collection, query, onSnapshot } from 'firebase/firestore';
import { auth, db, appId, API_URL } from '../firebase/firebaseConfig';

export const GlobalStateContext = React.createContext({});

export const useGlobalState = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  const [allDigimons, setAllDigimons] = useState([]);
  const [loadingAllDigimons, setLoadingAllDigimons] = useState(true);
  
  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [errorFavorites, setErrorFavorites] = useState(null);
  
  // Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserId(user ? user.uid : null);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);
  
  // Cargar todos los digimons (para Búsqueda)
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setAllDigimons(data))
      .catch(err => console.error("Error fetching all digimons:", err))
      .finally(() => setLoadingAllDigimons(false));
  }, []);
  
  // Cargar favoritos
  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      setLoadingFavorites(false);
      return;
    }
    
    setLoadingFavorites(true);
    const favsCollectionPath = `artifacts/${appId}/users/${userId}/favorites`;
    const q = query(collection(db, favsCollectionPath));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFavorites(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setLoadingFavorites(false);
    }, (err) => {
      console.error("Error fetching favorites:", err);
      setErrorFavorites("Error al cargar favoritos.");
      setLoadingFavorites(false);
    });
    
    return () => unsubscribe();
  }, [userId]);
  
  // Funciones de favoritos
  const handleAddFavorite = useCallback(async (digimon) => {
    if (!userId) return;
    const favDocPath = `artifacts/${appId}/users/${userId}/favorites/${digimon.name}`;
    try {
      await setDoc(doc(db, favDocPath), digimon);
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  }, [userId]);
  
  const handleRemoveFavorite = useCallback(async (digimonName) => {
    if (!userId) return;
    const favDocPath = `artifacts/${appId}/users/${userId}/favorites/${digimonName}`;
    try {
      await deleteDoc(doc(db, favDocPath));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  }, [userId]);
  
  return {
    user, userId, isAuthReady,
    allDigimons, loadingAllDigimons,
    favorites, loadingFavorites, errorFavorites,
    handleAddFavorite, handleRemoveFavorite
  };
};
