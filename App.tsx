import 'react-native-get-random-values'
import { ThemeProvider } from "styled-components/native";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import theme from './src/theme';
import { Loading } from "./src/components/Loading";
import { StatusBar } from "react-native";
import { Routes } from "./src/routes";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RealmProvider } from "./src/libs/realm";

export default function App(){
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  if(!fontsLoaded) {
    return ( 
      <Loading />
    )
  }
  
  return(
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar 
                barStyle="light-content" 
                backgroundColor="transparent" 
                translucent 
              />
              <RealmProvider>
                <Routes />
              </RealmProvider>
        </SafeAreaProvider>
      </ThemeProvider>
  )
}