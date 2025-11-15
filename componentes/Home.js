import React, { useState, useEffect, useMemo, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { GlobalStateContext } from './useGlobalState';
import { API_URL } from '../firebase/firebaseConfig';
import DigimonCard from './DigimonCard';
import { styles } from './GlobalStyles';

export default function HomePage({ navigation }) {
  const { favorites, handleAddFavorite, handleRemoveFavorite } = useContext(GlobalStateContext);
  const [digimons, setDigimons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  
  const favoriteNames = useMemo(() => new Set(favorites.map(f => f.name)), [favorites]);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}?page=${page}`)
      .then(res => {
        if (!res.ok) throw new Error('No se pudieron cargar los Digimons');
        return res.json();
      })
      .then(data => setDigimons(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);
  
  const onSelectDigimon = (name) => navigation.navigate('Details', { digimonName: name });
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pageContent}>
        {loading && page === 0 && <ActivityIndicator size="large" color="#06B6D4" />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <FlatList
          data={digimons}
          renderItem={({ item }) => (
            <DigimonCard 
              digimon={item}
              onSelect={onSelectDigimon}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
              isFavorite={favoriteNames.has(item.name)}
            />
          )}
          keyExtractor={item => item.name}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListFooterComponent={() => (
            <View style={styles.pagination}>
              <TouchableOpacity 
                style={[styles.button, page === 0 && styles.buttonDisabled]} 
                onPress={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                <Text style={styles.buttonText}>Anterior</Text>
              </TouchableOpacity>
              <Text style={styles.paginationText}>Página {page + 1}</Text>
              <TouchableOpacity 
                style={[styles.button, digimons.length < 20 && styles.buttonDisabled]} 
                onPress={() => setPage(p => p + 1)}
                disabled={digimons.length < 20}
              >
                <Text style={styles.buttonText}>Siguiente</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
