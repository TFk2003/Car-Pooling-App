# 📱 Carpool Mobile App - React Native Setup (Updated)

## 🚀 Quick Start with React Native Libraries

### 1. Create New Expo Project

```bash
npx create-expo-app CarpoolMobileApp --template
cd CarpoolMobileApp
```

### 2. Install React Native Specific Dependencies

```bash
# Navigation
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

# UI Components (Choose one)
npm install react-native-elements react-native-vector-icons
# OR
npm install react-native-paper

# Forms & Validation
npm install formik yup

# Gestures & Animations
npx expo install react-native-gesture-handler react-native-reanimated

# Camera & Image Picker
npx expo install expo-image-picker expo-camera

# Maps & Location
npx expo install expo-location
npm install react-native-maps

# Additional utilities
npm install react-native-image-picker
```

### 3. Updated App Structure

```
CarpoolMobileApp/
├── App.js
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button.js        # Custom button component
│   │   ├── Input.js         # Custom input component
│   │   ├── Card.js          # Custom card component
│   │   └── Form.js          # Form components with Formik
│   ├── screens/             # App screens
│   │   ├── IndexScreen.js
│   │   ├── PhoneEntryScreen.js
│   │   ├── PhoneVerificationScreen.js
│   │   ├── EmailEntryScreen.js
│   │   ├── EmailVerificationScreen.js
│   │   ├── ProfileSetupScreen.js
│   │   └── DashboardScreen.js
│   ├── navigation/          # Navigation setup
│   │   └── AppNavigator.js
│   ├── utils/              # Utility functions
│   │   ├── validation.js   # Yup validation schemas
│   │   └── constants.js    # App constants
│   └── styles/             # Shared styles
│       └── colors.js       # Color palette
├── assets/                 # Images, fonts, etc.
└── package.json
```

## 🎨 React Native Library Alternatives

### **Instead of Web Libraries:**

| Web Library               | React Native Alternative            | Purpose            |
| ------------------------- | ----------------------------------- | ------------------ |
| `tailwindcss`             | `StyleSheet` + `react-native-paper` | Styling            |
| `@radix-ui/*`             | `react-native-elements`             | UI Components      |
| `react-router-dom`        | `@react-navigation/native`          | Navigation         |
| `react-hook-form` + `zod` | `formik` + `yup`                    | Forms & Validation |
| `lucide-react`            | `@expo/vector-icons`                | Icons              |
| `framer-motion`           | `react-native-reanimated`           | Animations         |
| `next-themes`             | `react-native-paper` themes         | Dark/Light mode    |

### **React Native Specific Features:**

```bash
# Camera access for profile pictures
npx expo install expo-camera expo-image-picker

# Location services for pickup/dropoff
npx expo install expo-location react-native-maps

# Push notifications for ride updates
npx expo install expo-notifications

# Async storage for offline data
npx expo install @react-native-async-storage/async-storage

# Device contacts for inviting friends
npx expo install expo-contacts

# Calendar integration for scheduling
npx expo install expo-calendar
```

## 🔧 Updated Component Examples

### Custom Button Component

```javascript
// src/components/Button.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ onPress, title, variant = "primary", ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
      {...props}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
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
  },
  primary: {
    backgroundColor: "#54D9CC",
  },
  secondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D1D5DB",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: "#374151",
  },
});

export default Button;
```

### Form with Formik & Yup

```javascript
// src/components/ProfileForm.js
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Button from "./Button";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2, "Too Short!"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});

const ProfileForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: "", email: "", phoneNumber: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          {errors.name && touched.name && (
            <Text style={styles.error}>{errors.name}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            keyboardType="email-address"
          />
          {errors.email && touched.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}

          <Button title="Save" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    color: "#EF4444",
    fontSize: 14,
    marginBottom: 8,
  },
});

export default ProfileForm;
```

## 📱 Installation Command Summary

```bash
# Complete installation for Carpool app
npx create-expo-app CarpoolMobileApp
cd CarpoolMobileApp

# Install all dependencies at once
npm install @react-navigation/native @react-navigation/native-stack react-native-elements react-native-vector-icons formik yup react-native-paper react-native-maps react-native-image-picker

# Install Expo-specific packages
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated expo-image-picker expo-camera expo-location expo-notifications @react-native-async-storage/async-storage expo-contacts expo-calendar
```

## 🎯 Benefits of React Native Libraries

✅ **Native Performance**: Direct access to native APIs  
✅ **Platform Integration**: iOS/Android specific features  
✅ **Offline Support**: AsyncStorage for data persistence  
✅ **Camera & Photos**: Native image picker and camera  
✅ **Maps Integration**: Native maps with custom markers  
✅ **Push Notifications**: Real-time ride updates  
✅ **Contacts Access**: Easy rider/driver invitations

Your React Native carpool app now uses proper mobile libraries! 🚀📱
