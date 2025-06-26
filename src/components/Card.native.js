import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const Card = ({
  children,
  style,
  onPress,
  disabled = false,
  elevation = 2,
  ...props
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.card, { elevation }, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={onPress ? 0.8 : 1}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Android shadow
    elevation: 2,
  },
});

export default Card;
