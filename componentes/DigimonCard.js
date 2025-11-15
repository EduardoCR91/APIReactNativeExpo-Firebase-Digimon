import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './GlobalStyles';

export default function DigimonCard({ digimon, onSelect, onAddFavorite, onRemoveFavorite, isFavorite }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: digimon.img }} style={styles.cardImage} resizeMode="contain" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{digimon.name}</Text>
        <Text style={styles.cardLevel}>{digimon.level}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity style={[styles.button, styles.buttonCyan]} onPress={() => onSelect(digimon.name)}>
            <Text style={styles.buttonText}>Detalles</Text>
          </TouchableOpacity>
          {isFavorite ? (
            <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={() => onRemoveFavorite(digimon.name)}>
              <Text style={styles.buttonText}>Quitar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => onAddFavorite(digimon)}>
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
