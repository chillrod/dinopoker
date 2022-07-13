export const setLocalStorage = (ref: any, data: any) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(ref, JSON.stringify(data));
  }
};

export const getLocalStorage = (ref: any) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(ref);

    if (data) return JSON.parse(data);

    return console.warn(`LocalStorage: ${ref} not found`);
  }
};
