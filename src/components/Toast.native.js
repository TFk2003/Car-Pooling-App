import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Toast = ({
  visible,
  message,
  type = "info",
  duration = 3000,
  onHide,
}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide && onHide();
    });
  };

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Ionicons name="checkmark-circle" size={20} color="#10B981" />;
      case "error":
        return <Ionicons name="close-circle" size={20} color="#EF4444" />;
      case "warning":
        return <Ionicons name="warning" size={20} color="#F59E0B" />;
      default:
        return <Ionicons name="information-circle" size={20} color="#3B82F6" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#ECFDF5";
      case "error":
        return "#FEF2F2";
      case "warning":
        return "#FFFBEB";
      default:
        return "#EFF6FF";
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "#10B981";
      case "error":
        return "#EF4444";
      case "warning":
        return "#F59E0B";
      default:
        return "#3B82F6";
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
          backgroundColor: getBackgroundColor(),
          borderLeftColor: getBorderColor(),
        },
      ]}
    >
      <View style={styles.content}>
        {getIcon()}
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

// Toast Manager Hook
export const useToast = () => {
  const [toast, setToast] = React.useState({
    visible: false,
    message: "",
    type: "info",
  });

  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ visible: true, message, type, duration });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const ToastComponent = () => (
    <Toast
      visible={toast.visible}
      message={toast.message}
      type={toast.type}
      duration={toast.duration}
      onHide={hideToast}
    />
  );

  return {
    showToast,
    hideToast,
    ToastComponent,
    toast: {
      success: (message, duration) => showToast(message, "success", duration),
      error: (message, duration) => showToast(message, "error", duration),
      warning: (message, duration) => showToast(message, "warning", duration),
      info: (message, duration) => showToast(message, "info", duration),
    },
  };
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderLeftWidth: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  message: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
});

export default Toast;
