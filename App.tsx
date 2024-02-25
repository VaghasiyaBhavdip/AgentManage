
import * as React from 'react';
import { View, Text, LogBox } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontsFamily } from './src/utility/util';
import ManageByAgent from './src/screen/ManageByAgent';
import AddManageAgent from './src/screen/AddManageAgent';
import { Provider } from 'react-redux';
import store from './src/redux/store';



const Stack = createNativeStackNavigator();
export type UserData = {
  CompanyName:string,
  PersonName:string,
  MobileNumber:string,
  LandlineNo:string,
  LicenseNo:string
  PrimaryEmail:string,
  SecondaryEmail:string
};
export type RootStackParamList = {
  ManageByAgent: { user: UserData };
  AddManageAgent: undefined;
};

LogBox.ignoreAllLogs()
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="ManageByAgent" component={ManageByAgent} />
          <Stack.Screen name="AddManageAgent" component={AddManageAgent} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;