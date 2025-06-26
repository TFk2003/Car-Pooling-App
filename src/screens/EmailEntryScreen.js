import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const EmailEntryScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (email.trim() && email.includes("@")) {
      navigation.navigate("EmailVerification", { email });
    }
  };

  const isValidEmail = email.trim() && email.includes("@");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>Carpool</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <View style={styles.formContainer}>
            {/* Title */}
            <Text style={styles.title}>Enter your email</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
              />

              <TouchableOpacity
                style={[styles.nextButton, { opacity: isValidEmail ? 1 : 0.5 }]}
                onPress={handleNext}
                disabled={!isValidEmail}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{" "}
            <Text style={styles.linkText}>Terms of Service</Text> and{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    paddingTop: 64,
    paddingBottom: 48,
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 32,
  },
  inputContainer: {
    gap: 24,
  },
  input: {
    height: 56,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    color: "#111827",
  },
  nextButton: {
    backgroundColor: "#54D9CC",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
  termsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  termsText: {
    textAlign: "center",
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  linkText: {
    color: "#54D9CC",
    textDecorationLine: "underline",
  },
});

export default EmailEntryScreen;
