import React from "react";
import { Text, Pressable, Alert, View, Switch, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "../../hooks/useTranslation";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

export default function ProfileScreen({ navigation }) {
  const {
    user,
    logout,
    isDarkMode,
    toggleDarkMode,
    language,
    changeLanguage,
    languageOptions,
  } = useAuth();

  const { t } = useTranslation();

  const handleLogout = () => {
    Alert.alert(t("logoutTitle"), t("logoutConfirm"), [
      { text: t("cancel"), style: "cancel" },
      {
        text: t("logout"),
        style: "destructive",
        onPress: () => {
          logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ["#1c1c1c", "#2a2a2a"] : ["#eef2f3", "#dce3f1"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, isDarkMode && { color: "#fff" }]}>
          {t("profileTitle")}
        </Text>

        <Text style={[styles.label, isDarkMode && { color: "#ccc" }]}>
          {t("loggedInAs")}
        </Text>
        <Text style={[styles.value, isDarkMode && { color: "#fff" }]}>
          {user?.email || "?"}
        </Text>

        <View style={styles.setting}>
          <Text style={[styles.settingLabel, isDarkMode && { color: "#ccc" }]}>
            🌙 {t("darkMode")}
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>

        <Text style={[styles.settingLabel, isDarkMode && { color: "#ccc" }]}>
          🌍 {t("selectLanguage")}
        </Text>

        <FlatList
          data={languageOptions}
          keyExtractor={(item) => item.code}
          horizontal
          contentContainerStyle={styles.languageList}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.languageButton,
                language === item.code && styles.languageButtonActive,
              ]}
              onPress={() => changeLanguage(item.code)}
            >
              <Text
                style={[
                  styles.languageText,
                  isDarkMode && { color: "#fff" },
                  language === item.code && styles.languageTextActive,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          )}
        />

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>{t("logout")}</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}
