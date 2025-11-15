import React, { useState, useMemo, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { GlobalStateContext } from './useGlobalState';
import DigimonCard from './DigimonCard';
import { styles } from './GlobalStyles';

export default function SearchPage({ navigation }) {
  const { allDigimons, favorites, handleAddFavorite, handleRemoveFavorite, loadingAllDigimons } = useContext(GlobalStateContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  const favoriteNames = useMemo(() => new Set(favorites.map(f => f.name)), [favorites]);
  
  const filteredDigimons = useMemo(() => {
    if (!searchTerm) return [];
    return allDigimons.filter(d => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allDigimons, searchTerm]);
  
  const onSelectDigimon = (name) => navigation.navigate('Details', { digimonName: name });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pageContent}>
        <TextInput
          style={styles.searchInput}
          placeholder="Escribe el nombre de un Digimon..."
          placeholderTextColor="#9CA3AF"
          value={searchTerm}
          onChangeText={setSearchTerm}
          editable={!loadingAllDigimons}
        />
        {loadingAllDigimons && <ActivityIndicator size="small" color="#FFF" />}
        
        <FlatList
          data={filteredDigimons}
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
          ListEmptyComponent={() => (
            searchTerm.length > 0 && !loadingAllDigimons ? (
              <Text style={styles.infoText}>No se encontraron coincidencias.</Text>
            ) : null
          )}
        />
      </View>
    </SafeAreaView>
  );
}
