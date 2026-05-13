const BASE_URL = 'https://afraairline.com/api';

export const api = {
  getData: async () => {
    const res = await fetch(`${BASE_URL}/data`);
    return res.json();
  },
  saveData: async (data) => {
    const res = await fetch(`${BASE_URL}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};
