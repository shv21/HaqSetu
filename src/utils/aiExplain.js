const fallbackTemplates = {
  en: (scheme, profile) =>
    `This scheme is listed for ${scheme.targetUsers.join(", ")}. You may be eligible based on your profile. Please verify from the official portal or nearest CSC.`,
  hi: (scheme, profile) =>
    `यह योजना ${scheme.targetUsers.join(", ")} के लिए हो सकती है। आप संभवतः पात्र हो सकते हैं। कृपया आधिकारिक पोर्टल या निकटतम CSC पर सत्यापित करें।`,
  mr: (scheme, profile) =>
    `ही योजना ${scheme.targetUsers.join(", ")} साठी आहे. आपण कदाचित पात्र असू शकता. कृपया अधिकृत पोर्टल किंवा जवळच्या CSC वर सत्यापित करा.`,
};

const GEMINI_URL = "https://api.openai.com/v1/responses";

export async function getSchemeExplanation(scheme, profile, lang) {
  const prompt = `You are helping a low-literacy Indian user understand a government scheme. Explain only using the provided scheme data. Do not invent facts. Use simple language. Keep it short. Mention that final eligibility must be verified on the official portal or nearest CSC.\n\nScheme: ${scheme.name}\nDescription: ${scheme.description}\nBenefit: ${scheme.benefit}\nEligibility: ${JSON.stringify(scheme.eligibilityRules)}\nRequired documents: ${scheme.requiredDocuments.join(", ")}\nUser profile: ${JSON.stringify(profile)}\nLanguage: ${lang}`;

  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    return fallbackTemplates[lang]
      ? fallbackTemplates[lang](scheme, profile)
      : fallbackTemplates.en(scheme, profile);
  }

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gemini-1.0",
        input: prompt,
        max_output_tokens: 200,
      }),
    });
    const data = await response.json();
    const text =
      data?.output?.[0]?.content?.[0]?.text ||
      data?.choices?.[0]?.message?.content ||
      "";
    return text.trim() || fallbackTemplates[lang](scheme, profile);
  } catch (error) {
    console.warn("Gemini explanation error", error);
    return fallbackTemplates[lang]
      ? fallbackTemplates[lang](scheme, profile)
      : fallbackTemplates.en(scheme, profile);
  }
}
