import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { styles } from './GlobalStyles';

export default function InfoPage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.pageContent}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Acerca de DigiApp</Text>
          <Text style={styles.infoTextContent}>
            Esta aplicación es un explorador del Mundo Digital, construido como un demo utilizando React Native y Firebase.
          </Text>
          <Text style={styles.infoTextContent}>
            Toda la información es de la Digimon API.
          </Text>
          
          <Text style={styles.infoTitle}>Datos del Desarrollador</Text>
          <Text style={styles.infoTextContent}>
            Desarrollado por Carlos Eduardo Cruz.
          </Text>
          <TouchableOpacity onPress={() => Alert.alert("¡Hola!")}>
            <Text style={{ color: '#06B6D4' }}>¡Conéctate conmigo!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

