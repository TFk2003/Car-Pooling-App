import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

// Basic Modal Component
export const BasicModal = ({
  visible,
  onClose,
  title,
  children,
  animationType = "slide",
  transparent = true,
  showCloseButton = true,
}) => {
  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              {/* Header */}
              {(title || showCloseButton) && (
                <View style={styles.header}>
                  {title && <Text style={styles.title}>{title}</Text>}
                  {showCloseButton && (
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={onClose}
                    >
                      <Ionicons name="close" size={24} color="#6B7280" />
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Content */}
              <View style={styles.content}>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Bottom Sheet Modal
export const BottomSheetModal = ({
  visible,
  onClose,
  title,
  children,
  height: customHeight,
}) => {
  const slideAnim = React.useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              style={[
                styles.bottomSheet,
                {
                  height: customHeight || height * 0.7,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Drag Handle */}
              <View style={styles.dragHandle} />

              {/* Header */}
              {title && (
                <View style={styles.bottomSheetHeader}>
                  <Text style={styles.bottomSheetTitle}>{title}</Text>
                </View>
              )}

              {/* Content */}
              <View style={styles.bottomSheetContent}>{children}</View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Alert Modal
export const AlertModal = ({
  visible,
  onClose,
  title,
  message,
  buttons = [],
  type = "info",
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <Ionicons name="checkmark-circle" size={48} color="#10B981" />;
      case "error":
        return <Ionicons name="close-circle" size={48} color="#EF4444" />;
      case "warning":
        return <Ionicons name="warning" size={48} color="#F59E0B" />;
      default:
        return <Ionicons name="information-circle" size={48} color="#3B82F6" />;
    }
  };

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          {/* Icon */}
          <View style={styles.alertIcon}>{getIcon()}</View>

          {/* Title */}
          {title && <Text style={styles.alertTitle}>{title}</Text>}

          {/* Message */}
          {message && <Text style={styles.alertMessage}>{message}</Text>}

          {/* Buttons */}
          <View style={styles.alertButtons}>
            {buttons.length > 0 ? (
              buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.alertButton,
                    button.style === "destructive" && styles.destructiveButton,
                  ]}
                  onPress={() => {
                    button.onPress && button.onPress();
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      styles.alertButtonText,
                      button.style === "destructive" &&
                        styles.destructiveButtonText,
                    ]}
                  >
                    {button.text}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <TouchableOpacity style={styles.alertButton} onPress={onClose}>
                <Text style={styles.alertButtonText}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Usage Example
export const ModalExample = () => {
  const [basicVisible, setBasicVisible] = React.useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false);
  const [alertVisible, setAlertVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setBasicVisible(true)}
      >
        <Text style={styles.buttonText}>Show Basic Modal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setBottomSheetVisible(true)}
      >
        <Text style={styles.buttonText}>Show Bottom Sheet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setAlertVisible(true)}
      >
        <Text style={styles.buttonText}>Show Alert</Text>
      </TouchableOpacity>

      {/* Modals */}
      <BasicModal
        visible={basicVisible}
        onClose={() => setBasicVisible(false)}
        title="Basic Modal"
      >
        <Text>This is a basic modal content.</Text>
      </BasicModal>

      <BottomSheetModal
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        title="Bottom Sheet"
      >
        <Text>This is a bottom sheet modal content.</Text>
      </BottomSheetModal>

      <AlertModal
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        type="warning"
        buttons={[
          { text: "Cancel", onPress: () => {} },
          { text: "Confirm", style: "destructive", onPress: () => {} },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  button: {
    backgroundColor: "#54D9CC",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    margin: 20,
    maxHeight: height * 0.8,
    width: width - 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  bottomSheetHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  alertContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    margin: 20,
    alignItems: "center",
    maxWidth: width - 40,
  },
  alertIcon: {
    marginBottom: 16,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  alertButtons: {
    flexDirection: "row",
    gap: 12,
  },
  alertButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
  },
  destructiveButton: {
    backgroundColor: "#EF4444",
  },
  alertButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    textAlign: "center",
  },
  destructiveButtonText: {
    color: "#FFFFFF",
  },
});

export default {
  BasicModal,
  BottomSheetModal,
  AlertModal,
  ModalExample,
};
