import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getHistory } from "../storage/history";

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕘 Search History</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.word}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.word}>{item.word}</Text>
            <Text>{item.meanings[0].definitions[0].definition}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No history found.</Text>}
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
    borderRadius: 10,
    marginBottom: 10,
  },
  word: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});