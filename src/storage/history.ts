import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = "history";

export const saveHistory = async (word: any) => {
  const existing = await AsyncStorage.getItem(HISTORY_KEY);

  let history = existing ? JSON.parse(existing) : [];

  history = history.filter((item: any) => item.word !== word.word);

  history.unshift(word);

  if (history.length > 20) {
    history.pop();
  }

  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getHistory = async () => {
  const data = await AsyncStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
};