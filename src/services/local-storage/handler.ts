export const setLocalStorage = (ref: any, data: any) => {
  return localStorage.setItem(ref, JSON.stringify(data));
};

export const getLocalStorage = (ref: any) => {
  const data = localStorage.getItem(ref);

  if (data) return JSON.parse(data);

  return console.warn(`LocalStorage: ${ref} not found`);
};
