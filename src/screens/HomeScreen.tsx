import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { analyzeSentiment, SentimentResult } from "../services/Service";
import ResultCard from "../components/ResultCard";
import SuggestionCard from "../components/SuggestionCard";
import { addHistoryItem } from "../storage/HistoryStrg";
import { fetchAISummaryAndSuggestion } from "../services/Recommend";

const HomeScreen = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("History" as never)}
          style={{ marginRight: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="book-outline" size={22} color="#3A6EA5" />
          <Text style={{ color: "#3A6EA5", fontSize: 15, marginLeft: 5}}>
            Geçmiş
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const analyze = async () => {
    if (!text.trim()) {
      Alert.alert("Uyarı", "Lütfen bir metin girin.");
      return;
    }

    setLoading(true);
    setResult(null);
    setSummary(null);
    setSuggestion(null);

    try {
      console.log("=== SENTIMENT BAŞLIYOR ===");
      const prediction = await analyzeSentiment(text);
      console.log("=== SENTIMENT OK ===", prediction);

      setResult(prediction);

      console.log("=== AI ÖNERİ BAŞLIYOR ===");
      const ai = await fetchAISummaryAndSuggestion(text);
      console.log("=== AI ÖNERİ TAM ===", ai);

      setSummary(ai.summary);
      setSuggestion(ai.suggestion);

      console.log("=== KAYDETME BAŞLIYOR ===");
      await addHistoryItem(
        text,
        prediction.label,
        prediction.score,
        ai.suggestion,
        ai.summary
      );
      console.log("=== KAYDETME TAM ===");

    } catch (err: any) {
      console.log("❌ HomeScreen ERROR:", err);
      Alert.alert("Hata", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Bugün kendini nasıl hissediyorsun?"
        multiline
        value={text}
        onChangeText={setText}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Analiz Et" onPress={analyze} />
      )}

      {result && <ResultCard label={result.label} score={result.score} />}

      {summary && suggestion && (
        <SuggestionCard summary={summary} suggestion={suggestion} />
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
});

export default HomeScreen;
