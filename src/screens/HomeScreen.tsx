import React, { useState } from "react";
import WordCard from "../components/WordCard";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";

import { searchWord } from "../services/dictionaryApi";
import { saveHistory } from "../storage/history";

export default function HomeScreen() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const handleSearch = async () => {
    if (!word.trim()) return;
  
    try {
      setLoading(true);
      setError("");
  
      const data = await searchWord(word);
  
      setResult(data[0]);
  
      await saveHistory(data[0]);
    } catch (e) {
      setResult(null);
      setError("Word not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📖 Dictionary</Text>

      <TextInput
        placeholder="Search any word..."
        value={word}
        onChangeText={setWord}
        style={styles.input}
      />

      <Button
        title={loading ? "Searching..." : "Search"}
        onPress={handleSearch}
      />
      
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
      
      <WordCard result={result} />
     
      <Text style={styles.info}>
        Start typing to search for a word.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  info: {
    marginTop: 20,
    textAlign: "center",
    color: "gray",
    fontSize: 15,
  },
  error: {
    color: "red",
    marginTop: 20,
    textAlign: "center",
  },
  word: {
    fontSize: 26,
    fontWeight: "bold",
  },
  definition: {
    marginTop: 10,
    fontSize: 16,
  },
});