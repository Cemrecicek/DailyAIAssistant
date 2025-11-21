import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { HF_TOKEN } from '@env';

interface SentimentResult {
  label: string;
  score: number;
}

// 🚀 ÇALIŞAN MODEL (Router)
const API_URL =
  "https://router.huggingface.co/hf-inference/models/lxyuan/distilbert-base-multilingual-cased-sentiments-student";

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
      const response = await axios.post(
        API_URL,
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Yanıtı:", response.data);

      let predictions: SentimentResult[] = [];

      // Router bazen [[{...}]] bazen [{...}] döndürür → İkisini de yakala
      if (Array.isArray(response.data) && Array.isArray(response.data[0])) {
        predictions = response.data[0];
      } else if (Array.isArray(response.data)) {
        predictions = response.data as SentimentResult[];
      } else {
        throw new Error("Beklenmeyen API yanıt formatı");
      }

      // En yüksek skoru seç
      const best = predictions.reduce((a, b) =>
        a.score > b.score ? a : b
      );
// --- 🎯 NÖTR EŞİK KONTROLÜ ---
const positive = predictions.find(p => p.label.toLowerCase().includes("positive"));
const negative = predictions.find(p => p.label.toLowerCase().includes("negative"));

if (positive && negative) {
  const diff = Math.abs(positive.score - negative.score);

  console.log("Fark:", diff);

  // Eğer skorlar birbirine çok yakınsa nötr kabul et (eşik: 0.15)
  if (diff < 0.15) {
    setResult({
      label: "neutral",
      score: Math.max(positive.score, negative.score), // en yüksek güveni kullan
    });
    return;
  }
}


      setResult(best);

    } catch (err: any) {
      console.log("API Hatası:", err.response?.data || err.message);
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
