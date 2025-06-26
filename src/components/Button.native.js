import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const Button = ({
  onPress,
  title,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#FFFFFF" : "#54D9CC"}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`${variant}Text`],
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  primary: {
    backgroundColor: "#54D9CC",
  },
  secondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D1D5DB",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#54D9CC",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: "#374151",
  },
  outlineText: {
    color: "#54D9CC",
  },
  disabledText: {
    opacity: 0.6,
  },
});

export default Button;
