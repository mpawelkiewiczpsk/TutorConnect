import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("pl");

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedDarkMode = await AsyncStorage.getItem("darkMode");
        const storedLanguage = await AsyncStorage.getItem("language");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedDarkMode !== null) setIsDarkMode(storedDarkMode === "true");
        if (storedLanguage) setLanguage(storedLanguage);
      } catch (e) {
        console.error("Błąd przy ładowaniu danych użytkownika", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    navigation.reset({
      index: 0,
      routes: [{ name: "Tabs" }],
    });
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem("darkMode", newValue.toString());
  };

  const changeLanguage = async (lang) => {
    setLanguage(lang);
    await AsyncStorage.setItem("language", lang);
  };

  const languageOptions = [
    { code: "pl", label: "🇵🇱 Polski" },
    { code: "en", label: "🇬🇧 English" },
    { code: "de", label: "🇩🇪 Deutsch" },
  ];

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        isLoading,
        isDarkMode,
        toggleDarkMode,
        language,
        changeLanguage,
        languageOptions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() must be used within <AuthProvider>");
  }
  return context;
};
