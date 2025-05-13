import React, { useState } from "react";
import {
  Text,
  Pressable,
  Alert,
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

export default function BookingScreen({ route, navigation }) {
  const { tutor, slot } = route.params;
  const [selectedSubject, setSelectedSubject] = useState(
    tutor.subjects[0]?.name || "",
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = async () => {
    const subjectData = tutor.subjects.find((s) => s.name === selectedSubject);

    const newBooking = {
      id: Date.now().toString(),
      tutorName: tutor.name,
      subject: selectedSubject,
      price: subjectData.price,
      time: slot,
    };

    try {
      const prev = await AsyncStorage.getItem("bookings");
      const bookings = prev ? JSON.parse(prev) : [];
      bookings.push(newBooking);
      await AsyncStorage.setItem("bookings", JSON.stringify(bookings));

      Alert.alert("Sukces", "Rezerwacja została zapisana.");
      navigation.navigate("Tabs", { screen: "Bookings" });
    } catch (e) {
      Alert.alert("Błąd", "Nie udało się zapisać rezerwacji.");
    }
  };

  return (
    <LinearGradient colors={["#f0f4ff", "#e2f1ff"]} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.title}>Potwierdź rezerwację</Text>

            <Text style={styles.label}>👤 Korepetytor:</Text>
            <Text style={styles.value}>{tutor.name}</Text>

            <Text style={styles.label}>📅 Termin:</Text>
            <Text style={styles.value}>{slot}</Text>

            <Text style={styles.label}>📚 Przedmiot:</Text>
            <Pressable
              style={styles.dropdown}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.dropdownText}>
                {selectedSubject || "Wybierz przedmiot"}
              </Text>
            </Pressable>

            <Pressable style={styles.button} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Zarezerwuj</Text>
            </Pressable>
          </View>
        </ScrollView>

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Wybierz przedmiot</Text>
              {tutor.subjects.map((sub, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedSubject(sub.name);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>
                    {sub.name} ({sub.price} zł/h)
                  </Text>
                </TouchableOpacity>
              ))}
              <Pressable
                style={styles.modalCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Anuluj</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}
