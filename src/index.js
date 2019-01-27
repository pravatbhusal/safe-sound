import React from "react";
import { Platform, StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./screens/home";

// create the stackNavigator that holds all the pages (Intents)
const Navigation = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    // create a padding to avoid overlapping the navbar of the device
    cardStyle: {
      paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    }
  }
);

// export the Index class as an app container
const Index = createAppContainer(Navigation);
export default Index;
