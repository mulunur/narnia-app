import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewItemScreen } from '../../screens/NewItemScreen';
import { BottomTabs } from '../BottomTab/BottomTabs';
import { CameraScreen } from '../../screens/CameraScreen';



export function StackNavigator() {
    const Stack = createNativeStackNavigator()
  
    return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Bottom Tab Navigator" component={BottomTabs}/>
      <Stack.Screen name="NewItemScreen" component={NewItemScreen}/>
      {/* <Stack.Screen name="ImagePickScreen" component={CameraScreen}/> */}
    </Stack.Navigator>
  )
}