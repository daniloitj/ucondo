import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Accounts } from '../screens/Accounts';
import { AddAccount } from '../screens/AddAccount';
const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return(
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen 
        name="accounts"
        component={Accounts}
      />
      <Screen 
        name="addAccount"
        component={AddAccount}
      />      
    </Navigator>
  )
}