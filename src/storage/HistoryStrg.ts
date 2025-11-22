import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export interface HistoryItem {
    id: string;
    text: string;
    sentiment: string;
    score: number;
    date: string;
    suggestion: string;
    summary: string;
}

const STORAGE_KEY = "DAILY_AI_HISTORY";

// 📌 Yeni kayıt ekle
export async function addHistoryItem(
    text: string,
    sentiment: string,
    score: number,
    suggestion: string,
    summary: string
) {
    const newItem: HistoryItem = {
        id: uuid.v4().toString(),
        text,
        sentiment,
        score,
        suggestion,
        summary,
        date: new Date().toISOString(),
    };

    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const data: HistoryItem[] = existing ? JSON.parse(existing) : [];

    data.unshift(newItem);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 📌 Tüm geçmişi getir
export async function getHistory(): Promise<HistoryItem[]> {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        return json ? JSON.parse(json) : [];
    } catch (error) {
        console.error("History get error:", error);
        return [];
    }
}

// 📌 Geçmişi sil
export async function clearHistory() {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("History clear error:", error);
    }
}
