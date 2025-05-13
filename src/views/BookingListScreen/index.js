import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

export default function BookingListScreen({ navigation }) {
  const [futureBookings, setFutureBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await AsyncStorage.getItem("bookings");
        const bookings = data ? JSON.parse(data) : [];

        const now = dayjs();

        const future = bookings
          .filter((b) => dayjs(b.time).isAfter(now))
          .sort((a, b) => dayjs(a.time).unix() - dayjs(b.time).unix());

        const past = bookings
          .filter((b) => dayjs(b.time).isBefore(now))
          .sort((a, b) => dayjs(b.time).unix() - dayjs(a.time).unix());

        setFutureBookings(future);
        setPastBookings(past);
      } catch (e) {
        console.error("Błąd podczas ładowania rezerwacji", e);
      }
    };

    return navigation.addListener("focus", loadBookings);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.subject} – {item.tutorName}
      </Text>
      <Text style={styles.time}>
        🕒 {dayjs(item.time).format("YYYY-MM-DD HH:mm")}
      </Text>
      <Text style={styles.price}>💰 {item.price} zł</Text>
    </View>
  );

  return (
    <LinearGradient colors={["#dceefb", "#e2eafc"]} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Przyszłe rezerwacje</Text>
            <FlatList
              data={futureBookings}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={styles.empty}>Brak przyszłych rezerwacji.</Text>
              }
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📜 Przeszłe rezerwacje</Text>
            <FlatList
              data={pastBookings}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={styles.empty}>Brak przeszłych rezerwacji.</Text>
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
