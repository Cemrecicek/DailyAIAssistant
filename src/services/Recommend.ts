import axios from "axios";
import { GOOGLE_API_KEY } from "@env";

// Gemini 2.0 Flash modeli
const MODEL_NAME = "gemini-2.0-flash";

export interface GeminiResult {
  summary: string;
  suggestion: string;
}

export const fetchAISummaryAndSuggestion = async (text: string): Promise<GeminiResult> => {
  console.log("===== GEMINI ÖNERİ SERVİSİ BAŞLADI =====");
  console.log("Kullanıcı metni:", text);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GOOGLE_API_KEY}`;

  const prompt = `
    Sen bir psikologsun.
    Kullanıcı: "${text}"

    Görev:
    1. Durumu 1 kısa cümleyle özetle.
    2. 1 kısa motive edici tavsiye ver.

    Cevabı SADECE şu JSON formatında ver:

    {
      "summary": "",
      "suggestion": ""
    }
  `;

  console.log("Hazırlanan prompt:", prompt);

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    console.log("Gemini isteği gönderiliyor...");

    const res = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("API Dönen ham data:", res.data);

    const rawText =
      res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("Model RAW cevap:", rawText);

    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}") + 1;

    if (start === -1 || end === -1) {
      throw new Error("AI yanıtında JSON bulunamadı.");
    }

    const jsonString = rawText.substring(start, end);
    console.log("Parse edilecek JSON:", jsonString);

    const parsed = JSON.parse(jsonString) as GeminiResult;

    console.log("Gemini başarıyla parse edildi:", parsed);

    return parsed;
  } catch (err: any) {
    console.log("❌ GEMINI HATASI:", err.response?.data || err.message);
    throw err;
  }
};
