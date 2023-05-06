import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreenScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';
import BasketScreen, {BasketScreenProps} from './screens/BasketScreen';

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import DetailsScreen from './screens/DetailsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import {enableScreens} from 'react-native-screens';
import {StyleSheet} from 'react-native';
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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}: any) => ({
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Details') {
              return {display: 'none'};
            }
            return {
              borderTopWidth: 0,
              height: 150,
              paddingTop: 70,
            };
          })(route),
          tabBarIcon: ({focused}) => (
            <Feather
              name="home"
              size={26}
              color={focused ? '#5956E9' : '#200E32'}
              style={{
                shadowColor: '#5956E9',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            />
          ),
          activeTintColor: 'tomato',
        })}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="heart-outline"
              size={26}
              color={focused ? '#5956E9' : '#200E32'}
              style={{
                shadowColor: '#5956E9',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="person-outline"
              size={26}
              color={focused ? '#5956E9' : '#200E32'}
              style={{
                shadowColor: '#5956E9',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Basket"
        component={BasketScreen as React.ComponentType<BasketScreenProps | any>}
        options={{
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="cart-outline"
              size={26}
              color={focused ? '#5956E9' : '#200E32'}
              style={{
                shadowColor: '#5956E9',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            />
          ),
        }}
      />
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

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
  },
});
