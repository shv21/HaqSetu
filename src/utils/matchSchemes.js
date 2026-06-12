import schemes from "../data/schemes.js";

const OCCUPATION_MAP = {
  student: ["student"],
  "informal worker": [
    "informal worker",
    "daily wage worker",
    "self-employed",
    "street vendor",
    "gig worker",
  ],
  "daily wage worker": ["daily wage worker", "informal worker"],
  "self-employed": ["self-employed", "informal worker"],
  "street vendor": ["street vendor", "informal worker"],
  homemaker: ["homemaker"],
  farmer: ["farmer"],
  "unemployed youth": ["unemployed youth", "student"],
  "pregnant woman / mother": ["pregnant woman / mother"],
};

function scoreForOccupation(scheme, occupation) {
  if (!scheme.eligibilityRules?.requiredOccupation || !occupation) return 0;
  const occupationAliases = OCCUPATION_MAP[occupation] || [occupation];
  return scheme.eligibilityRules.requiredOccupation.some((rule) =>
    occupationAliases.includes(rule),
  )
    ? 20
    : 0;
}

function scoreForAge(scheme, age) {
  if (!scheme.eligibilityRules) return 0;
  const min = scheme.eligibilityRules.minAge || 0;
  const max = scheme.eligibilityRules.maxAge || 100;
  if (!age) return 0;
  if (age >= min && age <= max) return 15;
  if (age >= min - 5 && age <= max + 5) return 5;
  return 0;
}

function scoreForArea(scheme, areaType) {
  if (scheme.eligibilityRules?.requiresRural && areaType === "rural") return 10;
  if (scheme.eligibilityRules?.requiresRural && areaType !== "rural")
    return -15;
  return 0;
}

function scoreForDocuments(scheme, profile, reasons, missing) {
  const docs = scheme.requiredDocuments || [];
  let score = 0;
  docs.forEach((doc) => {
    const key = doc.toLowerCase().includes("aadhaar")
      ? "hasAadhaar"
      : doc.toLowerCase().includes("mobile")
        ? "hasMobileLinked"
        : doc.toLowerCase().includes("bank")
          ? "hasBankAccount"
          : doc.toLowerCase().includes("ration")
            ? "hasRationCard"
            : doc.toLowerCase().includes("income")
              ? "hasIncomeCert"
              : doc.toLowerCase().includes("caste")
                ? "hasCasteCert"
                : doc.toLowerCase().includes("disability")
                  ? "hasDisabilityCert"
                  : null;
    if (key) {
      if (profile[key] === true) {
        score += 6;
        reasons.push(`Has ${doc}`);
      } else {
        score -= 3;
        missing.add(doc);
      }
    }
  });
  return score;
}

function scoreForCoreRules(scheme, profile, reasons) {
  let score = 0;
  if (scheme.eligibilityRules?.requiresAadhaar) {
    if (profile.hasAadhaar === true) {
      score += 10;
      reasons.push("Aadhaar present");
    } else {
      score -= 10;
    }
  }
  if (scheme.eligibilityRules?.requiresMobileLinked) {
    if (profile.hasMobileLinked === true) {
      score += 8;
      reasons.push("Mobile linked with Aadhaar");
    } else {
      score -= 5;
    }
  }
  if (scheme.eligibilityRules?.requiresBankAccount) {
    if (profile.hasBankAccount === true) {
      score += 8;
      reasons.push("Bank account present");
    } else {
      score -= 5;
    }
  }
  if (scheme.eligibilityRules?.requiresRationCard) {
    if (profile.hasRationCard === true) {
      score += 6;
      reasons.push("Ration card present");
    } else {
      score -= 5;
    }
  }
  if (scheme.eligibilityRules?.requiresIncomeCert) {
    if (profile.hasIncomeCert === true) {
      score += 6;
      reasons.push("Income certificate present");
    } else {
      score -= 4;
    }
  }
  if (scheme.eligibilityRules?.requiresCasteCert) {
    if (profile.hasCasteCert === true) {
      score += 4;
      reasons.push("Caste certificate present");
    } else if (profile.hasCasteCert === false) {
      score -= 2;
    }
  }
  if (scheme.eligibilityRules?.requiresDisabilityCert) {
    if (profile.hasDisabilityCert === true) {
      score += 4;
      reasons.push("Disability certificate present");
    } else if (profile.hasDisabilityCert === false) {
      score -= 2;
    }
  }
  if (scheme.eligibilityRules?.requiresPregnantMother) {
    if (profile.occupation === "pregnant woman / mother") {
      score += 10;
      reasons.push("Pregnant woman or mother");
    } else {
      score -= 10;
    }
  }
  return score;
}

function buildReasons(scheme, profile) {
  const reasons = [];
  if (profile.areaType === "rural" && scheme.eligibilityRules?.requiresRural) {
    reasons.push("Rural-focused scheme");
  }
  if (scheme.targetUsers.includes(profile.occupation)) {
    reasons.push("Scheme matches your profile group");
  }
  return reasons;
}

export function matchSchemes(profile) {
  const matched = [];
  schemes.forEach((scheme) => {
    const reasons = buildReasons(scheme, profile);
    const missingDocuments = new Set();
    let score = 0;
    score += scoreForOccupation(scheme, profile.occupation);
    score += scoreForAge(scheme, Number(profile.age));
    score += scoreForArea(scheme, profile.areaType);
    score += scoreForCoreRules(scheme, profile, reasons);
    score += scoreForDocuments(scheme, profile, reasons, missingDocuments);
    const normalizedScore = Math.max(0, Math.min(100, Math.round(score + 20)));
    const warningList = [...(scheme.fraudWarnings || [])];
    const nextSteps = [...scheme.applySteps];
    const show = normalizedScore >= 35 || reasons.length > 0;
    if (show) {
      matched.push({
        scheme,
        score: normalizedScore,
        reasons: reasons.length ? reasons : ["Possible match based on profile"],
        missingDocuments: Array.from(missingDocuments),
        warnings: warningList,
        nextSteps,
      });
    }
  });
  matched.sort((a, b) => b.score - a.score);
  return matched;
}
