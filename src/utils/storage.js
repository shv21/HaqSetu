const STORAGE_KEYS = {
  profile: 'haqsetu_profile',
  analytics: 'haqsetu_analytics',
  checklist: 'haqsetu_checklist',
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
