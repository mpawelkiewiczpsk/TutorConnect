import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: "#2e2e2e",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#222",
  },
  detail: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  empty: {
    fontStyle: "italic",
    color: "#666",
    fontSize: 14,
    paddingVertical: 8,
  },
  textLight: {
    color: "#eee",
  },
});

export default styles;
