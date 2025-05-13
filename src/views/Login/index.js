import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axiosInstance from "./../../api/axiosInstance";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("jan@example.com");
  const [password, setPassword] = useState("1234");

  useEffect(() => {
    checkForBiometricLogin();
  }, []);

  const checkForBiometricLogin = async () => {
    const savedUser = await AsyncStorage.getItem("user");
    if (!savedUser) return;

    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!compatible || !enrolled) return;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Zaloguj się biometrycznie",
    });

    if (result.success) {
      const parsed = JSON.parse(savedUser);
      login(parsed);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) return;

    try {
      const res = await axiosInstance.get("/users", {
        params: { email, password },
      });

      const user = res.data[0];

      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        login(user);
      } else {
        Alert.alert("Błąd", "Niepoprawny email lub hasło.");
        setPassword("");
      }
    } catch (error) {
      console.error("Błąd logowania:", error);
      Alert.alert("Błąd", "Nie udało się połączyć z serwerem.");
    }
  };

  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.wrapper}
      >
        <View style={styles.card}>
          <Text style={styles.icon}>🔒</Text>
          <Text style={styles.title}>Zaloguj się</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Hasło"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Zaloguj się</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
