import React from "react";
import { Text, FlatList, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

export default function TutorProfileScreen({ route, navigation }) {
  const { tutor } = route.params;

  const availableSlots = [
    "2025-05-14 16:00",
    "2025-05-15 10:00",
    "2025-05-16 18:30",
    "2025-05-17 09:00",
  ];

  const handleBooking = (slot) => {
    navigation.navigate("Booking", { tutor, slot });
  };

  return (
    <LinearGradient colors={["#eef2f3", "#dfe9f3"]} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.name}>{tutor.name}</Text>
            <Text style={styles.bio}>{tutor.bio}</Text>

            <Text style={styles.section}>📚 Przedmioty i ceny</Text>
            {tutor.subjects.map((sub, index) => (
              <Text key={index} style={styles.subject}>
                • {sub.name} – {sub.price} zł/h
              </Text>
            ))}

            <Text style={styles.section}>🕒 Dostępne terminy</Text>
            <FlatList
              data={availableSlots}
              scrollEnabled={false}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.slot}
                  onPress={() => handleBooking(item)}
                >
                  <Text style={styles.slotText}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
