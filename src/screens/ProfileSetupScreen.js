import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileSetupScreen({ navigation }) {
  const [selectedMode, setSelectedMode] = useState("Rider");
  const [acAvailable, setAcAvailable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    make: "",
    model: "",
    numberPlate: "",
    numberOfSeats: "",
  });

  const handleSave = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.phoneNumber) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Navigate to dashboard
    navigation.navigate("Dashboard");
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const ModeButton = ({ mode, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.modeButton,
        isSelected ? styles.modeButtonSelected : styles.modeButtonUnselected,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.modeButtonText,
          isSelected
            ? styles.modeButtonTextSelected
            : styles.modeButtonTextUnselected,
        ]}
      >
        {mode}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Get Started Section */}
      <View style={styles.getStartedSection}>
        <Text style={styles.brandTitle}>Carpool</Text>
        <Text style={styles.getStartedTitle}>Get started</Text>

        <View style={styles.getStartedButtons}>
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
            <Text style={styles.secondaryButtonText}>Continue with phone</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Setup Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Setup</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          {/* Basic Information */}
          <View style={styles.section}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => updateFormData("name", value)}
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => updateFormData("email", value)}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.input}
                value={formData.gender}
                onChangeText={(value) => updateFormData("gender", value)}
                placeholder="Select gender"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                onChangeText={(value) => updateFormData("phoneNumber", value)}
                placeholder="Enter your phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>

            {/* Profile Picture */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Profile Picture</Text>
              <View style={styles.uploadContainer}>
                <Text style={styles.uploadText}>No file selected</Text>
                <TouchableOpacity style={styles.uploadButton}>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={16}
                    color="#54D9CC"
                  />
                  <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Select Mode */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Mode</Text>
            <View style={styles.modeContainer}>
              <ModeButton
                mode="Rider"
                isSelected={selectedMode === "Rider"}
                onPress={() => setSelectedMode("Rider")}
              />
              <ModeButton
                mode="Driver"
                isSelected={selectedMode === "Driver"}
                onPress={() => setSelectedMode("Driver")}
              />
              <ModeButton
                mode="Both"
                isSelected={selectedMode === "Both"}
                onPress={() => setSelectedMode("Both")}
              />
            </View>
          </View>

          {/* Vehicle Details */}
          {(selectedMode === "Driver" || selectedMode === "Both") && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Vehicle Details</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Make</Text>
                <TextInput
                  style={styles.input}
                  value={formData.make}
                  onChangeText={(value) => updateFormData("make", value)}
                  placeholder="Make"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Model</Text>
                <TextInput
                  style={styles.input}
                  value={formData.model}
                  onChangeText={(value) => updateFormData("model", value)}
                  placeholder="Model"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Number Plate</Text>
                <TextInput
                  style={styles.input}
                  value={formData.numberPlate}
                  onChangeText={(value) => updateFormData("numberPlate", value)}
                  placeholder="Number Plate"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Number of Seats</Text>
                <TextInput
                  style={styles.input}
                  value={formData.numberOfSeats}
                  onChangeText={(value) =>
                    updateFormData("numberOfSeats", value)
                  }
                  placeholder="Number of Seats"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>

              {/* AC Available */}
              <View style={styles.switchContainer}>
                <Text style={styles.label}>AC Available</Text>
                <Switch
                  value={acAvailable}
                  onValueChange={setAcAvailable}
                  trackColor={{ false: "#D1D5DB", true: "#54D9CC" }}
                  thumbColor={acAvailable ? "#FFFFFF" : "#F3F4F6"}
                />
              </View>
            </View>
          )}

          {/* Optional Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Optional</Text>

            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionText}>Set Daily Schedule</Text>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionText}>Preferred Pickup Locations</Text>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{" "}
            <Text style={styles.linkText}>Terms of Service</Text> and{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  getStartedSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 32,
  },
  getStartedTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 24,
  },
  getStartedButtons: {
    width: "100%",
    maxWidth: 384,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#54D9CC",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
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
  },
  secondaryButtonText: {
    color: "#374151",
    fontSize: 18,
    fontWeight: "500",
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
  scrollView: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
  },
  uploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  uploadText: {
    color: "#6B7280",
    fontSize: 16,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#54D9CC",
    borderRadius: 6,
    gap: 4,
  },
  uploadButtonText: {
    color: "#54D9CC",
    fontSize: 14,
    fontWeight: "500",
  },
  modeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  modeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  modeButtonSelected: {
    backgroundColor: "#111827",
  },
  modeButtonUnselected: {
    backgroundColor: "#F3F4F6",
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  modeButtonTextSelected: {
    color: "#FFFFFF",
  },
  modeButtonTextUnselected: {
    color: "#374151",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  saveButton: {
    backgroundColor: "#54D9CC",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
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
