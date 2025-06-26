import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmailVerificationScreen({ navigation, route }) {
  const { email = "lucas.carter@email.com" } = route.params || {};
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      navigation.navigate("ProfileSetup");
    }
  };

  const handleResendCode = () => {
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleEditEmail = () => {
    navigation.navigate("EmailEntry");
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.formContainer}>
          {/* Title and Description */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Enter the code</Text>
            <Text style={styles.description}>
              We sent a verification code to
            </Text>
            <Text style={styles.email}>{email}</Text>
          </View>

          {/* Code Input */}
          <View style={styles.codeContainer}>
            <View style={styles.codeInputRow}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  style={styles.codeInput}
                  value={digit}
                  onChangeText={(value) => handleInputChange(index, value)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(index, nativeEvent.key)
                  }
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>

            <View style={styles.actionLinks}>
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={styles.linkText}>Resend code</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleEditEmail}>
                <Text style={styles.linkText}>Edit email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Verify Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.verifyButton,
            { opacity: code.join("").length === 6 ? 1 : 0.5 },
          ]}
          onPress={handleVerify}
          disabled={code.join("").length !== 6}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  formContainer: {
    maxWidth: 384,
    alignSelf: "center",
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: "#6B7280",
    lineHeight: 28,
  },
  email: {
    fontSize: 18,
    color: "#111827",
    fontWeight: "500",
    marginTop: 4,
  },
  codeContainer: {
    alignItems: "center",
    gap: 24,
  },
  codeInputRow: {
    flexDirection: "row",
    gap: 12,
  },
  codeInput: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  actionLinks: {
    alignItems: "center",
    gap: 12,
  },
  linkText: {
    fontSize: 18,
    color: "#6B7280",
    textDecorationLine: "underline",
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  verifyButton: {
    backgroundColor: "#54D9CC",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
});
