const KEYS = {
  USER: 'mdv2_user',
  COMPANY: 'mdv2_company',
  EXPERT_PROFILE: 'mdv2_expert_profile',
};

export const store = {
  getUser: () => { try { return JSON.parse(localStorage.getItem(KEYS.USER)); } catch { return null; } },
  setUser: (u) => localStorage.setItem(KEYS.USER, JSON.stringify(u)),
  clearAll: () => Object.values(KEYS).forEach((k) => localStorage.removeItem(k)),

  getCompany: () => { try { return JSON.parse(localStorage.getItem(KEYS.COMPANY)) || {}; } catch { return {}; } },
  setCompany: (c) => {
    const prev = store.getCompany();
    localStorage.setItem(KEYS.COMPANY, JSON.stringify({ ...prev, ...c }));
  },

  getExpertProfile: () => { try { return JSON.parse(localStorage.getItem(KEYS.EXPERT_PROFILE)) || {}; } catch { return {}; } },
  setExpertProfile: (p) => {
    const prev = store.getExpertProfile();
    localStorage.setItem(KEYS.EXPERT_PROFILE, JSON.stringify({ ...prev, ...p }));
  },
};
