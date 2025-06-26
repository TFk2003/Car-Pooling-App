import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "default",
  size = "default",
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];

    switch (variant) {
      case "destructive":
        baseStyle.push(styles.destructive);
        break;
      case "outline":
        baseStyle.push(styles.outline);
        break;
      case "secondary":
        baseStyle.push(styles.secondary);
        break;
      case "ghost":
        baseStyle.push(styles.ghost);
        break;
      case "link":
        baseStyle.push(styles.link);
        break;
      default:
        baseStyle.push(styles.default);
    }

    if (disabled) baseStyle.push(styles.disabled);

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text];

    switch (variant) {
      case "destructive":
        baseStyle.push(styles.destructiveText);
        break;
      case "outline":
        baseStyle.push(styles.outlineText);
        break;
      case "secondary":
        baseStyle.push(styles.secondaryText);
        break;
      case "ghost":
        baseStyle.push(styles.ghostText);
        break;
      case "link":
        baseStyle.push(styles.linkText);
        break;
      default:
        baseStyle.push(styles.defaultText);
    }

    if (disabled) baseStyle.push(styles.disabledText);

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? "#54D9CC" : "#FFFFFF"}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  // Sizes
  default: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sm: {
    height: 36,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  lg: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 32,
  },
  icon: {
    height: 40,
    width: 40,
  },
  // Variants
  default: {
    backgroundColor: "#54D9CC",
  },
  destructive: {
    backgroundColor: "#EF4444",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  secondary: {
    backgroundColor: "#F3F4F6",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  link: {
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.5,
  },
  // Text styles
  text: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  defaultText: {
    color: "#FFFFFF",
  },
  destructiveText: {
    color: "#FFFFFF",
  },
  outlineText: {
    color: "#374151",
  },
  secondaryText: {
    color: "#374151",
  },
  ghostText: {
    color: "#374151",
  },
  linkText: {
    color: "#54D9CC",
    textDecorationLine: "underline",
  },
  disabledText: {
    opacity: 0.6,
  },
});

export { Button };
