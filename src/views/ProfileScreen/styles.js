import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#222",
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 30,
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  languageList: {
    gap: 8,
    marginBottom: 24,
  },
  languageButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: "#ddd",
    marginRight: 8,
    height: 32,
    justifyContent: "center",
  },
  languageButtonActive: {
    backgroundColor: "#4CAF50",
  },
  languageText: {
    fontSize: 13,
    color: "#333",
  },
  languageTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#e53935",
    padding: 16,
    borderRadius: 10,
    marginTop: 40,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
