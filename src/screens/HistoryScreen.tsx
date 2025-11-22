import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, } from "react-native";
import { getHistory, HistoryItem, clearHistory } from "../storage/HistoryStrg";
import ResultCard from "../components/ResultCard";
import SuggestionCard from "../components/SuggestionCard";
import { useNavigation } from "@react-navigation/native";

const HistoryScreen = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
            await clearHistory();
            loadHistory();
          }}
          style={{
            marginRight: 10,
            backgroundColor: "#3A6EA5",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Temizle</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    loadHistory();
  }, []);


  const loadHistory = async () => {
    setLoading(true);
    const data = await getHistory();
    setHistory(data);
    setLoading(false);
  };



  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (history.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Henüz hiçbir analiz yapılmadı.</Text>
      </View>
    );
  }

  // 🔽 En güncel kayıt
  const latest = history[0];

  return (
    <ScrollView style={styles.container}>

      {/* Günlük Değerlendirme Kartı */}
      <SuggestionCard
        summary={latest.summary || "—"}
        suggestion={latest.suggestion || "—"}
      />

      {/* Başlık */}
      <Text style={styles.historyTitle}>Haftalık Özet</Text>

      {/* Geçmiş Listesi */}
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <ResultCard label={item.sentiment} score={item.score} />
            <SuggestionCard summary={item.summary || "—"} suggestion={item.suggestion || "—"} />
            <Text style={styles.date}>{formatDate(item.date)}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },

  historyTitle: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "800",
    color: "#3A6EA5",
    
  },

  item: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 10,
  },

  text: {
    marginTop: 10,
    fontSize: 14,
    color: "#444",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#555",
  },

  clearButton: {
    backgroundColor: "#3A6EA5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: "flex-end",
  },

  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HistoryScreen;
