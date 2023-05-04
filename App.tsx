import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreenScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';
import BasketScreen from './screens/BasketScreen';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import DetailsScreen from './screens/DetailsScreen';

import {enableScreens} from 'react-native-screens';
enableScreens();

const SplashScreenStack = createNativeStackNavigator();

function SplashScreenStackScreen() {
  return (
    <SplashScreenStack.Navigator>
      <SplashScreenStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <SplashScreenStack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </SplashScreenStack.Navigator>
  );
}

const HomeScreenStack = createNativeStackNavigator();
function HomeStack() {
  return (
    <HomeScreenStack.Navigator screenOptions={{headerShown: false}}>
      <HomeScreenStack.Screen name="HomeStack" component={HomeScreenScreen} />
      <HomeScreenStack.Screen name="Details" component={DetailsScreen} />
    </HomeScreenStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}: any) => ({
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            console.log(routeName);
            if (routeName === 'Details') {
              return {display: 'none'};
            }
            return;
          })(route),
        })}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Basket" component={BasketScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <SplashScreenStackScreen />
    </NavigationContainer>
  );
}

export default App;
