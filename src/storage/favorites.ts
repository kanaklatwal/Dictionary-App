import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favorites";

export const saveFavorite = async (word: any) => {
  try {
    const existing = await AsyncStorage.getItem(FAVORITES_KEY);

    const favorites = existing ? JSON.parse(existing) : [];

    const alreadyExists = favorites.find(
      (item: any) => item.word === word.word
    );

    if (!alreadyExists) {
      favorites.push(word);
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFavorites = async () => {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);

  return data ? JSON.parse(data) : [];
};