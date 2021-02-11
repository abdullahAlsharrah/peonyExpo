import { Icon } from "native-base";
import React from "react";
import { Alert, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddButton = ({ onPress }) => {
  return (
    <Icon
      onPress={onPress}
      name="pluscircleo"
      type="AntDesign"
      style={{
        color: "#c39e81",
        fontSize: 40,
        position: "absolute",
        bottom: 10,
        right: 10,
      }}
    />
  );
};

export default AddButton;
