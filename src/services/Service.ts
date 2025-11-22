import axios from "axios";
import { HF_TOKEN } from "@env";

export interface SentimentResult {
  label: string;
  score: number;
}


const API_URL =
  "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-xlm-roberta-base-sentiment";

export async function analyzeSentiment(text: string): Promise<SentimentResult> {
  console.log("---- 🧠 Duygu Analizi Başlıyor (XLM-Roberta) ----");

  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: text,
        options: { wait_for_model: true }
      },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("HF Router Ham Yanıt:", response.data);

    // Router yanıtı genelde iç içe array döner: [[{label: '...', score: ...}, ...]]
    let predictions = [];
    if (Array.isArray(response.data) && Array.isArray(response.data[0])) {
      predictions = response.data[0];
    } else if (Array.isArray(response.data)) {
      predictions = response.data;
    } else {
      throw new Error("API yanıt formatı beklenmedik.");
    }



    const best = predictions.reduce((prev: any, current: any) =>
      (prev.score > current.score) ? prev : current
    );

    // BU MODELİN ETİKET HARİTASI
    // Label_0 -> Negative (Negatif)
    // Label_1 -> Neutral  (Nötr)
    // Label_2 -> Positive (Pozitif)

    let finalLabel = "neutral"; 

    if (best.label === "LABEL_0" || best.label === "Negative" || best.label === "negative") {
      finalLabel = "negative";
    } else if (best.label === "LABEL_1" || best.label === "Neutral" || best.label === "neutral") {
      finalLabel = "neutral";
    } else if (best.label === "LABEL_2" || best.label === "Positive" || best.label === "positive") {
      finalLabel = "positive";
    }

    const result = {
      label: finalLabel,
      score: best.score
    };


    console.log(`✅ Analiz Sonucu: ${result.label} (Skor: ${result.score})`);
    return result;

  } catch (error: any) {
    console.log("❌ Duygu Analizi Hatası (Router):", error.message);

    if (error.response) {
      console.log("Hata Detayı:", error.response.data);
    }

    // Hata durumunda (internet yoksa veya limit dolduysa) Nötr dön
    return { label: "neutral", score: 0.0 };
  }
}