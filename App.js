import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useGlobalState, GlobalStateContext } from './componentes/useGlobalState';
import RootNavigator from './componentes/AppNavigator';
import { styles } from './componentes/GlobalStyles';

export default function App() {
  const globalState = useGlobalState();
  
  // Muestra un "cargando" mientras Firebase y el estado se inicializan
  if (!globalState.isAuthReady) {
    return (
      <View style={[styles.safeArea, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="large" color="#06B6D4" />
      </View>
    );
  }
  
  return (
    // Proveemos el estado global a toda la app
    <GlobalStateContext.Provider value={globalState}>
      <RootNavigator />
    </GlobalStateContext.Provider>
  );
}

