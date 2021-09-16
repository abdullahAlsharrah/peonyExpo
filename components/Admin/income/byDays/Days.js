import React from "react";
import { View, Text } from "react-native";

const Days = ({ day, income, CheckMax, CheckMin }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        padding: 4,
        borderWidth: 1,
        borderColor: "#c4c4c4",
        width: "25%",
        backgroundColor:
          CheckMin(income) === true
            ? "tomato"
            : CheckMax(income)
            ? "green"
            : null,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          height: 50,
        }}
      >
        {day.name === "empt" ? null : (
          <>
            <Text>{day.name}</Text>
            <Text style={{ fontSize: 12 }}>{parseInt(income)} KD</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default Days;
