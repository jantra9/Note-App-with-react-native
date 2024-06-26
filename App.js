import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import AddNote from './screens/AddNote';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
      <>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="AddNote" component={AddNote} options={{ headerShown:false }}/>
    </Stack.Navigator>   
    </NavigationContainer> 
      </>     
    );
}