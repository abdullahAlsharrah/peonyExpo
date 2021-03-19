import { useNavigation } from "@react-navigation/native";
import { Icon } from "native-base";
import React from "react";
import { View, Text } from "react-native";

const Drawer = () => {
  const navigation = useNavigation();

  const handleDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <Icon
      onPress={handleDrawer}
      name="list"
      type="Ionicons"
      style={{
        marginLeft: 10,
        color: "#009387",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
      }}
    />
  );
};

export default Drawer;
