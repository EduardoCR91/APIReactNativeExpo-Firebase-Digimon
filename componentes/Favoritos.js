import React, { useContext, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { GlobalStateContext } from './useGlobalState';
import DigimonCard from './DigimonCard';
import { styles } from './GlobalStyles';

export default function FavoritesPage({ navigation }) {
  const { favorites, handleRemoveFavorite, loadingFavorites, errorFavorites } = useContext(GlobalStateContext);
  const favoriteNames = useMemo(() => new Set(favorites.map(f => f.name)), [favorites]);
  const onSelectDigimon = (name) => navigation.navigate('Details', { digimonName: name });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pageContent}>
        {loadingFavorites && <ActivityIndicator size="large" color="#06B6D4" />}
        {errorFavorites && <Text style={styles.errorText}>{errorFavorites}</Text>}
        
        {!loadingFavorites && favorites.length === 0 && (
          <Text style={styles.infoText}>No tienes ningún Digimon favorito.</Text>
        )}
        
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <DigimonCard 
              digimon={item}
              onSelect={onSelectDigimon}
              onAddFavorite={() => {}}
              onRemoveFavorite={handleRemoveFavorite}
              isFavorite={favoriteNames.has(item.name)}
            />
          )}
          keyExtractor={item => item.name}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}

