# HaqSetu

HaqSetu is an AI-assisted, voice-first, multilingual government scheme guidance platform for rural women, informal workers, daily-wage workers, students, and low-income families in India.

## Features

- Multilingual support: English, Hindi, Marathi
- Rule-based eligibility matching using government scheme data
- Voice assistant with speech recognition and speech synthesis
- Checklist generator with copy and download support
- Fraud safety guide and impact dashboard
- LocalStorage-based analytics and anonymous tracking
- Responsive mobile-first UI with Tailwind CSS

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router
- Plain JavaScript
- LocalStorage for app state and analytics

## Setup

1. Clone or copy the project into a local folder.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file from `.env.example` and add the Gemini key if available:

```bash
cp .env.example .env
```

4. Run locally:

```bash
npm run dev
```

## Environment Variables

- `VITE_GEMINI_API_KEY`: Optional Gemini API key for AI-powered scheme explanations. The app works without it.

## Responsible AI Approach

- Eligibility is decided by a transparent rule-based engine.
- AI only simplifies explanations, translates content, and improves readability.
- The app always warns: “You may be eligible. Please verify on the official portal or nearest CSC.”

## Hackathon Pitch

HaqSetu helps underserved users discover relevant government schemes with voice guidance, simple documents, and fraud safety checks. It is designed for low literacy, local languages, and safe public use.

## Future Scope

- WhatsApp bot
- NGO volunteer dashboard
- CSC operator mode
- More languages
- More verified schemes
- Offline mode
- PDF checklist
- Real official API integration

## Disclaimer

This MVP is for guidance only. It does not replace official government verification or certified advice.
