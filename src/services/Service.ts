import axios from "axios";
import { HF_TOKEN } from "@env";

export interface SentimentResult {
  label: string;
  score: number;
}

//model
const API_URL =
  "https://router.huggingface.co/hf-inference/models/lxyuan/distilbert-base-multilingual-cased-sentiments-student";

export async function analyzeSentiment(text: string) {
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

  console.log("Service API Yanıtı:", response.data);

  let predictions: SentimentResult[] = [];

  
  if (Array.isArray(response.data) && Array.isArray(response.data[0])) {
    predictions = response.data[0];
  } else if (Array.isArray(response.data)) {
    predictions = response.data as SentimentResult[];
  } else {
    throw new Error("Beklenmeyen API yanıt formatı");
  }


  const best = predictions.reduce((a, b) => (a.score > b.score ? a : b));

  // nötr için yakın farklar
  const positive = predictions.find((p) =>
    p.label.toLowerCase().includes("positive")
  );
  const negative = predictions.find((p) =>
    p.label.toLowerCase().includes("negative")
  );

  if (positive && negative) {
    const diff = Math.abs(positive.score - negative.score);

    console.log("Fark:", diff);

    if (diff < 0.15) {
      return {
        label: "neutral",
        score: Math.max(positive.score, negative.score),
      };
    }
  }

  return best;
}
