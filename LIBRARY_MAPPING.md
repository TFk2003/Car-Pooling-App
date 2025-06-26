# 📱 Web to React Native Library Mapping

## 🔄 Complete Library Replacements

| **Web Library**         | **React Native Alternative**                   | **Purpose**         | **Why Changed**                    |
| ----------------------- | ---------------------------------------------- | ------------------- | ---------------------------------- |
| `react-router-dom`      | `@react-navigation/native`                     | Navigation          | Native stack navigation for mobile |
| `vite`                  | **Metro Bundler** (built-in)                   | Build tool          | React Native's default bundler     |
| `recharts`              | `react-native-svg-charts` + `victory-native`   | Charts              | SVG-based charts for mobile        |
| `@radix-ui/react-*`     | `react-native-elements` + `react-native-paper` | UI Components       | Native mobile components           |
| `sonner`                | `react-native-toast-message`                   | Toast notifications | Mobile-optimized toasts            |
| `lucide-react`          | `@expo/vector-icons`                           | Icons               | Native vector icons                |
| `tailwindcss`           | `StyleSheet` + component libraries             | Styling             | Native styling system              |
| `next-themes`           | `react-native-paper` themes                    | Dark/Light mode     | Mobile theme system                |
| `framer-motion`         | `react-native-reanimated`                      | Animations          | Native 60fps animations            |
| `@tanstack/react-query` | Built-in `fetch` + `AsyncStorage`              | Data fetching       | Simpler mobile data management     |

## 📦 Detailed Replacements

### **🧭 Navigation: `react-router-dom` → `@react-navigation/native`**

**Before (Web):**

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
</BrowserRouter>;
```

**After (React Native):**

```javascript
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Index" component={IndexScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
</NavigationContainer>;
```

### **📊 Charts: `recharts` → `react-native-svg-charts` + `victory-native`**

**Before (Web):**

```javascript
import { LineChart, Line, XAxis, YAxis } from "recharts";

<LineChart data={data}>
  <XAxis dataKey="name" />
  <YAxis />
  <Line type="monotone" dataKey="value" stroke="#8884d8" />
</LineChart>;
```

**After (React Native):**

```javascript
import { LineChart } from "react-native-svg-charts";
// OR
import { VictoryLine, VictoryChart } from "victory-native";

<LineChart
  style={{ height: 200 }}
  data={data}
  svg={{ stroke: '#8884d8' }}
/>

// OR Victory Native
<VictoryChart>
  <VictoryLine data={data} />
</VictoryChart>
```

### **🎨 UI Components: `@radix-ui/*` → `react-native-elements` + `react-native-paper`**

**Before (Web):**

```javascript
import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>Content</Dialog.Content>
</Dialog.Root>

<Switch.Root>
  <Switch.Thumb />
</Switch.Root>
```

**After (React Native):**

```javascript
import { Modal, Switch } from "react-native";
import { Button } from "react-native-elements";
// OR
import { Modal, Switch, Button } from "react-native-paper";

<Modal visible={visible} onRequestClose={onClose}>
  <View>Content</View>
</Modal>

<Switch
  value={value}
  onValueChange={setValue}
  trackColor={{ false: "#767577", true: "#81b0ff" }}
/>
```

### **🔔 Toasts: `sonner` → `react-native-toast-message`**

**Before (Web):**

```javascript
import { toast } from "sonner";

toast.success("Success message");
toast.error("Error message");
```

**After (React Native):**

```javascript
import Toast from "react-native-toast-message";

Toast.show({
  type: "success",
  text1: "Success",
  text2: "Success message",
});

Toast.show({
  type: "error",
  text1: "Error",
  text2: "Error message",
});
```

### **🎯 Icons: `lucide-react` → `@expo/vector-icons`**

**Before (Web):**

```javascript
import { ArrowLeft, User, Settings } from "lucide-react";

<ArrowLeft size={24} />
<User size={20} />
<Settings size={16} />
```

**After (React Native):**

```javascript
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";

<Ionicons name="arrow-back" size={24} />
<Feather name="user" size={20} />
<MaterialIcons name="settings" size={16} />
```

### **🎨 Styling: `tailwindcss` → `StyleSheet`**

**Before (Web):**

```javascript
<div className="flex items-center justify-center bg-blue-500 p-4 rounded-lg">
  <span className="text-white font-bold">Button</span>
</div>
```

**After (React Native):**

```javascript
import { StyleSheet } from "react-native";

<View style={styles.button}>
  <Text style={styles.buttonText}>Button</Text>
</View>;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
```

## 🔧 Build Tool Changes

### **⚡ Bundler: `vite` → `Metro`**

**React Native uses Metro bundler by default:**

- No configuration needed
- Optimized for mobile
- Fast refresh built-in
- Tree shaking for mobile

**Commands:**

```bash
# Web (Vite)
npm run dev     # Start dev server
npm run build   # Production build

# React Native (Metro)
npx expo start  # Start dev server
npx expo build  # Production build
```

## 📱 Mobile-Specific Additions

### **New Libraries for Mobile Features:**

```json
{
  "expo-camera": "Camera access",
  "expo-location": "GPS location",
  "expo-notifications": "Push notifications",
  "react-native-maps": "Native maps",
  "expo-image-picker": "Photo gallery",
  "@react-native-async-storage/async-storage": "Local storage",
  "react-native-gesture-handler": "Touch gestures",
  "react-native-reanimated": "Native animations"
}
```

## 🚀 Performance Benefits

### **Why React Native Libraries are Better for Mobile:**

✅ **Native Performance**: Direct access to native APIs  
✅ **Smaller Bundle Size**: Only mobile-relevant code  
✅ **Better UX**: Platform-specific behaviors  
✅ **Hardware Access**: Camera, GPS, contacts, etc.  
✅ **Offline Support**: AsyncStorage for data persistence  
✅ **60fps Animations**: Native animation drivers

## 📋 Installation Commands

### **Remove Web Libraries:**

```bash
# These are NOT needed in React Native
npm uninstall vite tailwindcss recharts sonner lucide-react
npm uninstall @radix-ui/react-dialog @radix-ui/react-switch
npm uninstall react-router-dom @tanstack/react-query
```

### **Install React Native Alternatives:**

```bash
# Navigation
npm install @react-navigation/native @react-navigation/native-stack

# Charts
npm install react-native-svg-charts victory-native
npx expo install react-native-svg

# UI Components
npm install react-native-elements react-native-paper

# Toasts & Modals
npm install react-native-toast-message react-native-modal

# Forms & Inputs
npm install react-native-picker-select react-native-date-picker

# Utilities
npx expo install @react-native-async-storage/async-storage
```

Your React Native app now uses proper mobile libraries! 🚀📱
