import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function IndexScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>Carpool</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.formContainer}>
          {/* Title */}
          <Text style={styles.title}>Get started</Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("EmailEntry")}
            >
              <Text style={styles.primaryButtonText}>Continue with email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate("PhoneEntry")}
            >
              <Text style={styles.secondaryButtonText}>
                Continue with phone
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    paddingTop: 64,
    paddingBottom: 32,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  formContainer: {
    maxWidth: 384,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 32,
  },
  buttonContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#54D9CC",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  secondaryButtonText: {
    color: "#374151",
    fontSize: 18,
    fontWeight: "500",
  },
});
