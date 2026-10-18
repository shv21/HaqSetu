const STORAGE_KEYS = {
  profile: 'haqsetu_profile',
  analytics: 'haqsetu_analytics',
  checklist: 'haqsetu_checklist',
  savedSchemes: 'haqsetu_saved_schemes',
  recentlyViewed: 'haqsetu_recent_schemes',
  reports: 'haqsetu_reports',
};

export function saveAnalytics(entry) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.analytics) || '[]');
    stored.push(entry);
    localStorage.setItem(STORAGE_KEYS.analytics, JSON.stringify(stored));
  } catch (error) {
    console.error('Analytics storage failed', error);
  }
}

export function getAnalytics() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.analytics) || '[]');
  } catch (error) {
    return [];
  }
}

export function saveChecklist(checklist) {
  try {
    localStorage.setItem(STORAGE_KEYS.checklist, JSON.stringify(checklist));
  } catch (error) {
    console.error('Checklist save failed', error);
  }
}

export function loadChecklist() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.checklist) || '[]');
  } catch (error) {
    return [];
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
  } catch (error) {
    console.error('Profile storage failed', error);
  }
}

export function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.profile) || 'null');
  } catch (error) {
    return null;
  }
}

// Bookmarking / Saved Schemes
export function getSavedSchemeIds() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.savedSchemes) || '[]');
  } catch (error) {
    return [];
  }
}

export function toggleSaveScheme(schemeId) {
  try {
    const saved = getSavedSchemeIds();
    const exists = saved.includes(schemeId);
    const updated = exists ? saved.filter((id) => id !== schemeId) : [...saved, schemeId];
    localStorage.setItem(STORAGE_KEYS.savedSchemes, JSON.stringify(updated));
    return !exists;
  } catch (error) {
    console.error('Save scheme toggle failed', error);
    return false;
  }
}

export function isSchemeSaved(schemeId) {
  return getSavedSchemeIds().includes(schemeId);
}

// Recently Viewed Schemes
export function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.recentlyViewed) || '[]');
  } catch (error) {
    return [];
  }
}

export function addRecentlyViewed(schemeSummary) {
  try {
    if (!schemeSummary || !schemeSummary.id) return;
    const current = getRecentlyViewed();
    const filtered = current.filter((item) => item.id !== schemeSummary.id);
    const updated = [
      {
        id: schemeSummary.id,
        name: schemeSummary.name,
        category: schemeSummary.category,
        viewedAt: new Date().toISOString(),
      },
      ...filtered,
    ].slice(0, 5); // Keep top 5 recently viewed
    localStorage.setItem(STORAGE_KEYS.recentlyViewed, JSON.stringify(updated));
  } catch (error) {
    console.error('Recently viewed storage failed', error);
  }
}

// Outdated Scheme Reports
export function saveOutdatedReport(report) {
  try {
    const reports = JSON.parse(localStorage.getItem(STORAGE_KEYS.reports) || '[]');
    reports.push({
      ...report,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(reports));
    return true;
  } catch (error) {
    console.error('Save report failed', error);
    return false;
  }
}
