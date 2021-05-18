import React from "react";
import RootNavigator from "./components/navigator/index";
import { NavigationContainer } from "@react-navigation/native";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "native-base";
import Device from "react-native-device-detection";

export default function App() {
  const AppRendering = () => (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
  return Device.isAndroid ? (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaView>
  ) : (
    <AppRendering />
  );
}
