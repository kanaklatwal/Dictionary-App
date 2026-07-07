import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import { getFavorites } from "../storage/favorites";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ Favorites</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.word}
        ListEmptyComponent={
          <Text>No favorites yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.word}>{item.word}</Text>

            <Text numberOfLines={2}>
              {item.meanings[0].definitions[0].definition}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  word: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});