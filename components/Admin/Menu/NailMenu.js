import { observer } from "mobx-react";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Service from "../../services/Service";

const Menu = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.peony}>PEONY</Text>
        <View style={styles.loungeSpa}>
          {/* <Text style={styles.lounge}> </Text> */}
          <Text style={styles.spa}>LOUNGE SPA</Text>
        </View>
        <Text
          style={{
            color: "#c39e81",
            marginTop: 20,
            marginBottom: 100,
            textDecorationLine: "underline",
            textDecorationStyle: "double",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Nails {"   "}أظافر
        </Text>
      </View>
      <View style={[styles.container, { marginTop: -190 }]}>
        <Service category="Nails" menu={true} />
      </View>
    </>
  );
};

export default observer(Menu);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  lounge: {
    marginLeft: 25,
    color: "#c39e81",
    fontSize: 23,
    letterSpacing: 17,
    // textAlign: "center",
  },
  spa: {
    marginLeft: 9,
    // textAlign: "center",
    color: "#c39e81",
    fontSize: 23,
    letterSpacing: 16.3,
  },
  loungeSpa: { flexDirection: "row" },
  peony: {
    color: "#c39e81",
    fontSize: 70,
    letterSpacing: 20,
    marginLeft: 20,
  },
});
