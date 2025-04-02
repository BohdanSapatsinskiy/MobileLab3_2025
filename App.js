import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from "./screens/Home";
import Activities from "./screens/Activities";
import { ScoreProvider } from './components/scoreContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ScoreProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconPath;
            if (route.name === "Home") {
              iconPath = require("./img/menu/home.png");
            } else if (route.name === "Activities") {
              iconPath = require("./img/menu/bals.png");
            }
            return <Image source={iconPath} style={{ marginTop:10, width: 50, height: 50 }} />;
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#4682B4",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            height: 60,
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Activities" component={Activities} />
      </Tab.Navigator>
    </NavigationContainer>
    </ScoreProvider>
    </GestureHandlerRootView>
  );
}

