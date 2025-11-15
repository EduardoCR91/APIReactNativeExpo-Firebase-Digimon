import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { GlobalStateContext } from './useGlobalState';

// Pantallas de Auth
import LoginPage from './Login';
import RegisterPage from './Registro';

// Pantallas de App
import HomePage from './Home';
import DetailsPage from './PaginaDetalles';
import FavoritesPage from './Favoritos';
import SearchPage from './Busqeuda';
import InfoPage from './Informacion';
import TeamsPage from './Original'; // Renombrada de OriginalPage

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tabs de la App (Home, Buscar, etc.)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#06B6D4',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#111827',
          borderTopColor: '#374151',
        },
      }}
    >
      <Tab.Screen name="HomeTab" component={HomePage} options={{ title: 'Home' }} />
      <Tab.Screen name="SearchTab" component={SearchPage} options={{ title: 'Buscar' }} />
      <Tab.Screen name="FavoritesTab" component={FavoritesPage} options={{ title: 'Favoritos' }} />
      <Tab.Screen name="TeamsTab" component={TeamsPage} options={{ title: 'Equipos' }} />
      <Tab.Screen name="InfoTab" component={InfoPage} options={{ title: 'Info' }} />
      <Tab.Screen 
        name="LogoutTab"
        component={() => null} // Componente vacío
        options={{ title: 'Logout' }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Previene la navegación
            Alert.alert("Cerrar Sesión", "¿Estás seguro de que quieres salir?", [
              { text: "Cancelar", style: "cancel" },
              { text: "Salir", style: "destructive", onPress: () => signOut(auth) }
            ]);
          },
        }}
      />
    </Tab.Navigator>
  );
}

// Stack principal de la App (incluye Tabs y Detalles)
function AppStackScreen() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#111827' },
        headerTintColor: '#FFF',
        headerTitleStyle: { color: '#FFF' }
      }}
    >
      <AppStack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <AppStack.Screen name="Details" component={DetailsPage} options={{ title: 'Detalles del Digimon' }} />
    </AppStack.Navigator>
  );
}

// Navegador Raíz
export default function RootNavigator() {
  const { user } = useContext(GlobalStateContext);
  
  return (
    <NavigationContainer>
      {user ? (
        <AppStackScreen />
      ) : (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login" component={LoginPage} />
          <AuthStack.Screen name="Register" component={RegisterPage} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
