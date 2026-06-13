# HaqSetu: AI-Assisted Scheme Access Guide

**HaqSetu** is a multilingual, voice-first web platform that helps rural women, informal workers, daily-wage workers, students, and low-income families understand government schemes, required documents, application steps, and fraud safety guidance in simple language.

It is designed for users who may struggle with complex government portals, difficult eligibility language, scattered information, or low digital literacy.

> HaqSetu does not replace official government portals. It acts as a simple guidance bridge between official scheme information and first-time digital users.

---

## Live Demo

**Demo URL:** https://haq-setu.vercel.app/

---

## Problem

Many people in India are eligible for government schemes but still fail to access them because:

* Scheme information is scattered across different portals.
* Eligibility language is complex and difficult to understand.
* Users are often confused about required documents.
* Many first-time digital users do not know where to apply.
* Rural and low-income users may face language and accessibility barriers.
* Fake agents, OTP scams, and unofficial links create safety risks.

This creates a gap between **available benefits** and **actual access**.

---

## Solution

HaqSetu helps users answer a simple eligibility form in **English, Hindi, or Marathi**. Based on their age, occupation, income range, location, and available documents, the app uses a transparent rule-based matching system to show schemes they **may be eligible for**.

Each scheme result includes:

* Possible scheme match
* Match score
* Reason for the match
* Required documents
* Missing documents
* Step-by-step application guidance
* Official verification reminder
* Fraud safety warnings
* Voice-supported explanation

AI is used only to simplify explanations and improve readability. Eligibility is not decided by AI.

---

## Theme Alignment

**Hackathon Theme:** Build for Good
**Primary Track:** AWAAZ
**Focus Area:** Government scheme access, social entitlement awareness, documentation help, and safe public service guidance.

HaqSetu supports underserved users by making scheme discovery more understandable, accessible, and action-focused.

---

## Key Features

### Multilingual Support

The app supports:

* English
* Hindi
* Marathi

Users can choose their preferred language before starting the eligibility check.

### Rule-Based Scheme Matching

HaqSetu uses structured scheme data and transparent matching logic instead of relying on AI guesses.

The matching system considers:

* Age
* Gender
* Occupation type
* Rural or urban location
* Income range
* Available documents
* Scheme-specific requirements

### AI-Assisted Explanation

AI is used responsibly to simplify scheme explanations in user-friendly language.

AI does **not**:

* Decide eligibility
* Invent scheme benefits
* Replace official verification
* Provide legal or certified advice

### Voice Assistant

The app includes browser-based voice support using:

* Speech recognition
* Speech synthesis

This helps low-literacy users or users who prefer listening over reading.

### Document Checklist

Users can generate a checklist of required and missing documents.

Checklist features include:

* Tickable document list
* Copy checklist option
* Download checklist option
* Local saving through browser storage

### Fraud Safety Guide

The app includes a dedicated safety section that warns users about:

* OTP scams
* Fake agents
* Bank PIN sharing
* Unofficial links
* Unverified payment demands
* Unsafe document uploads

### Anonymous Impact Dashboard

The dashboard shows basic anonymous usage insights such as:

* Total eligibility checks
* Common missing documents
* Common occupations
* Top matched schemes
* Rural vs urban user distribution
* Language usage

No sensitive personal identity is stored.

---

## How It Works

1. User selects a language.
2. User fills a simple eligibility form.
3. The rule-based engine compares answers with stored scheme rules.
4. The app shows possible scheme matches.
5. User views required documents and missing documents.
6. User can generate a checklist.
7. User can use voice support or AI explanation.
8. User is guided to verify details through official portals or nearest CSC.

---

## Responsible AI Approach

HaqSetu follows a safety-first AI approach.

### What AI does

* Simplifies scheme explanations
* Converts complex text into easy language
* Helps users understand next steps
* Supports multilingual explanation

### What AI does not do

* AI does not decide final eligibility.
* AI does not guarantee benefits.
* AI does not replace government verification.
* AI does not provide legal, financial, or certified advice.

Every result clearly states:

> “You may be eligible. Please verify on the official portal or nearest CSC before applying.”

---

## Tech Stack

* React
* Vite
* Tailwind CSS
* React Router
* Plain JavaScript
* LocalStorage
* Browser Speech Recognition API
* Browser Speech Synthesis API
* Optional Gemini API integration
* Vercel deployment

---

## Project Structure

```txt
src/
  components/
    Navbar.jsx
    Hero.jsx
    LanguageSelector.jsx
    EligibilityForm.jsx
    SchemeCard.jsx
    SchemeResults.jsx
    SchemeDetailModal.jsx
    Checklist.jsx
    VoiceAssistant.jsx
    FraudSafety.jsx
    AdminDashboard.jsx
    Footer.jsx

  data/
    schemes.js
    translations.js

  utils/
    matchSchemes.js
    aiExplain.js
    storage.js
    checklist.js

  pages/
    Home.jsx
    Check.jsx
    Results.jsx
    Safety.jsx
    Dashboard.jsx
    About.jsx

  App.jsx
  main.jsx
  index.css
```

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/shv21/HaqSetu.git
cd haq-setu
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

```bash
cp .env.example .env
```

### 4. Add Gemini API key, optional

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

The app works even without the Gemini API key by using local fallback explanations.

### 5. Run locally

```bash
npm run dev
```

### 6. Build for production

```bash
npm run build
```

---

## Environment Variables

| Variable              | Required | Description                                                |
| --------------------- | -------- | ---------------------------------------------------------- |
| `VITE_GEMINI_API_KEY` | No       | Optional Gemini API key for AI-powered explanation support |

---

## Demo Flow

A typical demo can follow this path:

1. Open homepage.
2. Select language.
3. Start eligibility check.
4. Fill user details.
5. View possible scheme matches.
6. Open a scheme detail card.
7. Generate document checklist.
8. View fraud safety guidance.
9. Open anonymous impact dashboard.

---

## Example Use Case

A rural informal worker wants to know which government schemes may apply to them but does not understand official portal language.

Using HaqSetu, they can:

* Select their language.
* Answer simple questions.
* See possible scheme matches.
* Understand required documents.
* Identify missing documents.
* Read fraud safety warnings.
* Verify through official portals or CSC.

---

## Current Limitations

This is an MVP built for hackathon submission.

Current limitations:

* Scheme data needs regular manual verification.
* The app does not connect to official government APIs yet.
* Final eligibility cannot be guaranteed.
* Voice support depends on browser compatibility.
* LocalStorage is used for demo analytics instead of a production database.

---

## Future Scope

* WhatsApp bot for wider rural access
* NGO volunteer dashboard
* CSC operator mode
* More Indian languages
* More verified government schemes
* Offline-first mode
* PDF checklist generation
* Official API integration where available
* SMS-based guidance for low-internet areas
* Admin panel for verified scheme updates

---

## Safety Disclaimer

HaqSetu is a guidance tool only. It does not guarantee eligibility, approval, or benefits under any government scheme.

Users must verify all scheme details through official government portals, nearest CSC, or authorized public service centers before applying.

Users should never share OTP, bank PIN, passwords, or sensitive documents with unknown people or unofficial websites.

---

## Built For

**Build for Good Hackathon**
A social-impact hackathon focused on building meaningful technology solutions for real-world problems.

---

## Project Status

MVP completed and deployed.

The project is ready for demo, testing, feedback, and further improvement.
