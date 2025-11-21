import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import { analyzeSentiment } from "../services/Service";
import { SentimentResult } from "../services/Service";

const HomeScreen = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!text.trim()) {
      Alert.alert("Uyarı", "Lütfen bir metin girin.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const prediction = await analyzeSentiment(text);
      setResult(prediction);
    } catch (err: any) {
      console.log("Home Screen API Hatası:", err);
      Alert.alert("Hata", err.message || "API bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  };

  const getLabel = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("positive")) return "😊 Olumlu";
    if (l.includes("negative")) return "😡 Olumsuz";
    return "😐 Nötr";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Günlük Asistanım</Text>

      <TextInput
        style={styles.input}
        placeholder="Bugün kendini nasıl hissediyorsun?"
        value={text}
        onChangeText={setText}
        multiline
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Analiz Et" onPress={analyze} />
      )}

      {result && (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>{getLabel(result.label)}</Text>
          <Text style={styles.resultScore}>
            Güven: %{(result.score * 100).toFixed(1)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    height: 120,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  result: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  resultLabel: { fontSize: 20, fontWeight: "bold" },
  resultScore: { marginTop: 5, fontSize: 14, color: "#333" },
});

export default HomeScreen;
