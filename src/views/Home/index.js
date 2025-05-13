import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./../../api/axiosInstance";
import dayjs from "dayjs";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "../../hooks/useTranslation";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles";

export default function HomeScreen() {
  const [upcoming, setUpcoming] = useState([]);
  const [weekCount, setWeekCount] = useState(0);
  const [suggestedTutors, setSuggestedTutors] = useState([]);
  const { t } = useTranslation();
  const { isDarkMode } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem("bookings");
        const bookings = data ? JSON.parse(data) : [];

        const now = dayjs();
        const endOfWeek = now.endOf("week");

        const upcomingLessons = bookings
          .filter((b) => dayjs(b.time).isAfter(now))
          .sort((a, b) => dayjs(a.time).unix() - dayjs(b.time).unix());

        const thisWeek = bookings.filter((b) => {
          const time = dayjs(b.time);
          return time.isAfter(now) && time.isBefore(endOfWeek);
        });

        setUpcoming(upcomingLessons.slice(0, 5));
        setWeekCount(thisWeek.length);

        const res = await axiosInstance.get("/tutors");
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setSuggestedTutors(shuffled.slice(0, 3));
      } catch (e) {
        console.error("Błąd przy ładowaniu danych:", e);
      }
    };

    loadData();
  }, []);

  const renderLesson = ({ item }) => (
    <View style={[styles.card, isDarkMode && styles.cardDark]}>
      <Text style={[styles.title, isDarkMode && styles.textLight]}>
        {item.subject}
      </Text>
      <Text style={[styles.detail, isDarkMode && styles.textLight]}>
        👤 {item.tutorName}
      </Text>
      <Text style={[styles.detail, isDarkMode && styles.textLight]}>
        🕒 {dayjs(item.time).format("YYYY-MM-DD HH:mm")}
      </Text>
      <Text style={[styles.detail, isDarkMode && styles.textLight]}>
        💰 {item.price} zł
      </Text>
    </View>
  );

  const renderTutor = ({ item }) => (
    <View style={[styles.card, isDarkMode && styles.cardDark]}>
      <Text style={[styles.title, isDarkMode && styles.textLight]}>
        {item.name}
      </Text>
      <Text style={[styles.detail, isDarkMode && styles.textLight]}>
        {item.bio}
      </Text>
      <Text style={[styles.detail, isDarkMode && styles.textLight]}>
        📚 {item.subjects.map((s) => s.name).join(", ")}
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ["#1a1a1a", "#2a2a2a"] : ["#eef2f3", "#d9e4f5"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.textLight]}>
              {t("upcomingLessons")}
            </Text>
            {upcoming.length === 0 ? (
              <Text style={[styles.empty, isDarkMode && styles.textLight]}>
                {t("noUpcoming")}
              </Text>
            ) : (
              <FlatList
                data={upcoming}
                keyExtractor={(item) => item.id}
                renderItem={renderLesson}
                scrollEnabled={false}
              />
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.textLight]}>
              {t("lessonsThisWeek")}{" "}
              <Text style={{ fontWeight: "bold" }}>{weekCount}</Text>
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.textLight]}>
              {t("recommendedTutors")}
            </Text>
            <FlatList
              data={suggestedTutors}
              keyExtractor={(item) => item.id}
              renderItem={renderTutor}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
