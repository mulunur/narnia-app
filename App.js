import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTabs } from './src/components/BottomTab/BottomTabs';
import { StackNavigator } from './src/components/StackNavigator/StackNavigator'

export default function App() {

  return (
    <NavigationContainer>
      {/* <BottomTabs/> */}
      <StackNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
