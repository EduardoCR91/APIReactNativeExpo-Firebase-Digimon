import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator
} from 'react-native';
import { API_URL } from '../firebase/firebaseConfig';
import { styles } from './GlobalStyles';

export default function DetailsPage({ route, navigation }) {
  const { digimonName } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/name/${digimonName}`)
      .then(res => {
        if (!res.ok) throw new Error('Digimon no encontrado');
        return res.json();
      })
      .then(data => setDetails(data[0]))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [digimonName]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.pageContent}>
        {loading && <ActivityIndicator size="large" color="#06B6D4" />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {details && (
          <View style={styles.detailsContainer}>
            <Image source={{ uri: details.img }} style={styles.detailsImage} resizeMode="contain" />
            <Text style={styles.detailsTitle}>{details.name}</Text>
            <Text style={styles.detailsLevel}>{details.level}</Text>
            <Text style={styles.detailsDescription}>
              Este Digimon es conocido en el Mundo Digital por su increíble poder y apariencia única.
              Los datos detallados de atributos y evoluciones no están disponibles en esta API,
              ¡pero {details.name} sigue siendo un compañero formidable!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
