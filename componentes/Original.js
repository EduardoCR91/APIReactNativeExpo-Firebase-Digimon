import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image, 
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { GlobalStateContext } from './useGlobalState';
import { db, appId } from '../firebase/firebaseConfig';
import { styles } from './GlobalStyles';

const MAX_TEAM_MEMBERS = 3;

export default function TeamsPage() {
  const { userId, favorites, loadingFavorites, errorFavorites } = useContext(GlobalStateContext);
  const [teams, setTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [errorTeams, setErrorTeams] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [selectedDigimons, setSelectedDigimons] = useState([]);

  // Cargar equipos
  useEffect(() => {
    if (!userId) return;
    setLoadingTeams(true);
    setErrorTeams(null);
    const teamsCollectionPath = `artifacts/${appId}/users/${userId}/teams`;
    const q = query(collection(db, teamsCollectionPath));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTeams(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoadingTeams(false);
    }, (error) => {
      setErrorTeams("Error al cargar los equipos. Inténtalo de nuevo.");
      console.error("Error fetching teams:", error);
      setLoadingTeams(false);
    });
    
    return () => unsubscribe();
  }, [userId]);

  const handleToggleSelection = (digimonName) => {
    setSelectedDigimons(prev => {
      if (prev.includes(digimonName)) {
        return prev.filter(name => name !== digimonName);
      }
      return prev.length < MAX_TEAM_MEMBERS ? [...prev, digimonName] : prev;
    });
  };

  const handleCreateTeam = async () => {
    const isFormInvalid = !teamName.trim() || selectedDigimons.length === 0;
    if (isFormInvalid) return;
    
    const teamDigimons = favorites.filter(fav => selectedDigimons.includes(fav.name));
    try {
      const teamsCollectionPath = `artifacts/${appId}/users/${userId}/teams`;
      await addDoc(collection(db, teamsCollectionPath), {
        name: teamName,
        members: teamDigimons
      });
      setTeamName('');
      setSelectedDigimons([]);
    } catch (err) {
      console.error("Error creating team:", err);
    }
  };

  const handleDeleteTeam = (teamId) => {
    Alert.alert(
      "Eliminar Equipo",
      "¿Estás seguro de que quieres eliminar este equipo?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: async () => {
            const teamDocPath = `artifacts/${appId}/users/${userId}/teams/${teamId}`;
            await deleteDoc(doc(db, teamDocPath));
          }
        }
      ]
    );
  };
  
  const isCreateDisabled = !teamName.trim() || selectedDigimons.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.pageContent}>
        <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
          <Text style={styles.formTitle}>Crear Nuevo Equipo</Text> 
          <TextInput
            style={styles.formInput}
            placeholder="Nombre del Equipo"
            placeholderTextColor="#9CA3AF"
            value={teamName}
            onChangeText={setTeamName}
          />
          
          <Text style={styles.formLabel}>{`Selecciona de tus Favoritos (Máx ${MAX_TEAM_MEMBERS}):`}</Text>
          {loadingFavorites && <ActivityIndicator color="#FFF" />}
          {errorFavorites && <Text style={styles.errorText}>{errorFavorites}</Text>}
          {!loadingFavorites && favorites.length === 0 && (
            <Text style={styles.infoText}>Necesitas favoritos para crear un equipo.</Text>
          )}

          <View style={styles.teamSelectionList}>
            {favorites.map(fav => (
              <TouchableOpacity 
                key={fav.name}
                style={[
                  styles.teamSelectionItem, 
                  selectedDigimons.includes(fav.name) && styles.teamSelectionItemActive
                ]}
                onPress={() => handleToggleSelection(fav.name)}
              >
                <Image source={{ uri: fav.img }} style={styles.teamSelectionImg} />
                <Text style={styles.teamSelectionName}>{fav.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity 
            style={[styles.button, styles.buttonCyan, isCreateDisabled && styles.buttonDisabled]} 
            onPress={handleCreateTeam}
            disabled={isCreateDisabled}
          >
            <Text style={styles.buttonText}>Crear Equipo</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        
        <View style={styles.teamsListContainer}>
          <Text style={styles.formTitle}>Mis Equipos</Text>
          {loadingTeams && <ActivityIndicator color="#FFF" />}
          {errorTeams ? <Text style={styles.errorText}>{errorTeams}</Text> : !loadingTeams && teams.length === 0 && <Text style={styles.infoText}>No has creado equipos.</Text>}
          
          {teams.map(team => (
            <View key={team.id} style={styles.teamCard}>
              <View style={styles.teamCardHeader}>
                <Text style={styles.teamCardTitle}>{team.name}</Text>
                <TouchableOpacity onPress={() => handleDeleteTeam(team.id)}>
                  <Text style={{ color: '#DC2626' }}>Eliminar</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.teamCardMembers}>
                {team.members.map(member => (
                  <View key={member.name} style={styles.teamCardMember}>
                    <Image source={{ uri: member.img }} style={styles.teamCardMemberImg} />
                    <Text style={styles.teamCardMemberName}>{member.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
