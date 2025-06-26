import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

// Import screens
import IndexScreen from "./screens/IndexScreen";
import PhoneEntryScreen from "./screens/PhoneEntryScreen";
import PhoneVerificationScreen from "./screens/PhoneVerificationScreen";
import EmailEntryScreen from "./screens/EmailEntryScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import ProfileSetupScreen from "./screens/ProfileSetupScreen";
import DashboardScreen from "./screens/DashboardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="PhoneEntry" component={PhoneEntryScreen} />
        <Stack.Screen
          name="PhoneVerification"
          component={PhoneVerificationScreen}
        />
        <Stack.Screen name="EmailEntry" component={EmailEntryScreen} />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerificationScreen}
        />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
