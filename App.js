import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { colors } from "./lib/theme";

import SplashScreen from "./app/tabs/SplashScreen";
import LoginScreen from "./app/tabs/LoginScreen";
import RegisterScreen from "./app/tabs/RegisterScreen";
import HomeScreen from "./app/tabs/HomeScreen";
import SearchScreen from "./app/tabs/SearchScreen";
import ResultsScreen from "./app/tabs/ResultsScreen";
import FlightDetailScreen from "./app/tabs/FlightDetailScreen";
import BookingScreen from "./app/tabs/BookingScreen";
import PaymentScreen from "./app/tabs/PaymentScreen";
import ConfirmationScreen from "./app/tabs/ConfirmationScreen";
import MyTripsScreen from "./app/tabs/MyTripsScreen";
import ProfileScreen from "./app/tabs/ProfileScreen";
import HotelsScreen from "./app/tabs/HotelsScreen";
import AttractionsScreen from "./app/tabs/AttractionsScreen";
import OffersScreen from "./app/tabs/OffersScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon({ icon, label, focused }) {
  return (
    <View style={{ alignItems:"center", paddingTop:4 }}>
      <Text style={{ fontSize:20 }}>{icon}</Text>
      <Text style={{ fontSize:8, color:focused?colors.accent:"#aaa", fontWeight:focused?"700":"400", marginTop:2 }}>{label}</Text>
    </View>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor:"#fff", borderTopWidth:0.5, borderTopColor:"#e0ede0", height:65, paddingBottom:8 },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{ tabBarIcon:({focused}) => <TabIcon icon="🏠" label="Home" focused={focused}/> }}/>
      <Tab.Screen name="Search" component={SearchScreen}
        options={{ tabBarIcon:({focused}) => <TabIcon icon="✈️" label="Flights" focused={focused}/> }}/>
      <Tab.Screen name="Hotels" component={HotelsScreen}
        options={{ tabBarIcon:({focused}) => <TabIcon icon="🏨" label="Hotels" focused={focused}/> }}/>
      <Tab.Screen name="Offers" component={OffersScreen}
        options={{ tabBarIcon:({focused}) => <TabIcon icon="🎯" label="Offers" focused={focused}/> }}/>
      <Tab.Screen name="MyTrips" component={MyTripsScreen}
        options={{ tabBarIcon:({focused}) => <TabIcon icon="💼" label="My Trips" focused={focused}/> }}/>
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{ tabBarIcon:({focused}) => <TabIcon icon="👤" label="Profile" focused={focused}/> }}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Main" component={HomeTabs}/>
        <Stack.Screen name="Results" component={ResultsScreen}/>
        <Stack.Screen name="FlightDetail" component={FlightDetailScreen}/>
        <Stack.Screen name="Booking" component={BookingScreen}/>
        <Stack.Screen name="Payment" component={PaymentScreen}/>
        <Stack.Screen name="Confirmation" component={ConfirmationScreen}/>
        <Stack.Screen name="Attractions" component={AttractionsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
