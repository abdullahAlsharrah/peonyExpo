import { observer } from "mobx-react";
import { Icon, Item, Spinner } from "native-base";
import React from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import costStore from "../../../stores/costStore";

const CostItem = ({ cost }) => {
  if (costStore.loading) return <Spinner />;
  const handleDelete = () => {
    Alert.alert(
      "Delete Cost",
      `Are you Sure you want to delete ${cost.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => costStore.deleteCost(cost.id),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <Item style={styles.text}>
        <Text>{cost.name}</Text>
      </Item>
      <Item style={styles.text}>
        <Text>{cost.price} KD</Text>
      </Item>

      <Icon
        onPress={handleDelete}
        name="delete"
        type="AntDesign"
        style={styles.icon}
      />
    </View>
  );
};

export default observer(CostItem);
const styles = StyleSheet.create({
  container: { flexDirection: "row", width: "100%" },

  text: { width: "50%", justifyContent: "center", height: 50 },

  icon: {
    fontSize: 15,
    color: "red",
    position: "absolute",
    left: 2,
    bottom: "40%",
  },
});
