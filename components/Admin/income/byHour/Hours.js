import React from "react";
import { View, Text } from "react-native";

const Hours = ({ hour, income, CheckMax, CheckMin }) => {
  const _hour =
    hour <= 11 ? `${hour} AM` : hour === 12 ? `${hour} PM` : `${hour - 12} PM`;
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
        style={{ justifyContent: "center", alignItems: "center", height: 50 }}
      >
        {hour === "empt" || hour === "empt2" ? null : (
          <>
            <Text>{_hour}</Text>
            <Text style={{ fontSize: 12 }}>{parseInt(income)} KD</Text>
          </>
        )}
      </View>

      {/* <View
        style={{
          height: 30,
          width: 1,
          backgroundColor: "black",
          marginLeft: 8,
        }}
      /> */}
    </View>
  );
};

export default Hours;
