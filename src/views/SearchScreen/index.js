import React, { useEffect, useState } from "react";
import {
  TextInput,
  FlatList,
  Text,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axiosInstance from "./../../api/axiosInstance";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axiosInstance.get("/tutors");
        setTutors(res.data);
      } catch (err) {
        console.error("Błąd podczas pobierania tutorów:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const filteredTutors = tutors.filter((tutor) => {
    const q = query.toLowerCase();
    return (
      tutor.name.toLowerCase().includes(q) ||
      tutor.subjects.some((sub) => sub.name.toLowerCase().includes(q))
    );
  });

  const renderTutor = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("TutorProfile", { tutor: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.bio}>{item.bio}</Text>
      <Text style={styles.subjects}>
        📚 {item.subjects.map((s) => `${s.name} (${s.price} zł)`).join(", ")}
      </Text>
    </Pressable>
  );

  return (
    <LinearGradient colors={["#e8f0ff", "#dcecf9"]} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TextInput
            placeholder="🔍 Szukaj korepetytora lub przedmiotu..."
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholderTextColor="#888"
          />

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#666"
              style={{ marginTop: 40 }}
            />
          ) : (
            <FlatList
              data={filteredTutors}
              keyExtractor={(item) => item.id}
              renderItem={renderTutor}
              contentContainerStyle={styles.list}
            />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
