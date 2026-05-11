# 📘 AI Daily Assistant

AI Daily Assistant is a React Native application that analyzes users’ daily emotional states, summarizes their journal entries, and provides personalized AI-powered suggestions. It helps users track their emotional progress by storing past records and offering meaningful feedback.

---

## Application Demo

![App Preview](images/harikayım.gif)

## Features

- Sentiment Analysis
- AI-generated Suggestions & Summaries
- History Tracking
- History Screen
- Delete History
- ResultCard & SuggestionCard Components
- React Navigation Integration
- Offline Support (history access with AsyncStorage)

---

## Technologies Used

- React Native
- TypeScript
- React Navigation
- AsyncStorage
- react-native-uuid
- react-native-vector-icons
- HuggingFace API
- Google Gemini API

---

## AI Service Architecture

The application uses two AI-powered processes:

### 1. Sentiment Analysis

User journal input is analyzed using a sentiment analysis model and classified as:

- positive
- neutral
- negative

### 2. AI Summary & Recommendation Generation

The user input is also sent to an AI text generation API to produce:

- Summary
- Personalized suggestion

API keys are managed using `.env` configuration.

---

## Screenshots

<img src="images/harika.png" width="250" />
<img src="images/yorgun.png" width="250" />

---

## Project Structure

```text
src/
 ├── assets/
 │    ├── negatif.png
 │    ├── notr.png
 │    └── pozitif.png
 ├── components/
 │    ├── ResultCard.tsx
 │    ├── SuggestionCard.tsx
 │    └── AnalyzeCard.tsx
 ├── screens/
 │    ├── HomeScreen.tsx
 │    └── HistoryScreen.tsx
 ├── services/
 │    ├── Service.ts
 │    └── Recommend.ts
 └── storage/
      └── HistoryStrg.ts
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Cemrecicek/DailyAIAssistant.git
cd DailyAIAssistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. iOS setup (macOS only)

```bash
cd ios && pod install && cd ..
```

### 4. Run the application

```bash
npm run android
npm run ios
```

---

## Environment Variables

Create a `.env` file:

```env
OPENAI_API_KEY=YOUR_API_KEY
HF_API_KEY=YOUR_API_KEY
```

---

## Screens

### HomeScreen

- Sentiment analysis
- AI-generated summary & suggestions
- Card-based result display
- Navigation to history screen

### HistoryScreen

- Latest summary & suggestion cards
- Full history listing
- Clear history functionality

---

## Data Model (HistoryItem)

```ts
interface HistoryItem {
  id: string;
  text: string;
  sentiment: string;
  score: number;
  date: string;
  suggestion: string;
  summary: string;
}
```

Thanks to AsyncStorage, users can access their saved history even without an internet connection.
