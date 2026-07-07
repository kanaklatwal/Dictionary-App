import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { saveFavorite } from "../storage/favorites";
import { Audio } from "expo-av";
type Props = {
  result: any;
};

export default function WordCard({ result }: Props) {
  if (!result) return null;

  const handleFavorite = async () => {
    await saveFavorite(result);
    alert("Added to Favorites ⭐");
  };
  
  const playAudio = async () => {
    try {
      const audio = result.phonetics?.find(
        (item: any) => item.audio
      );
  
      if (!audio) {
        alert("No pronunciation available");
        return;
      }
  
      const { sound } = await Audio.Sound.createAsync({
        uri: audio.audio,
      });
  
      await sound.playAsync();
    } catch (err) {
      console.log(err);
    }
  }; 

  return (
    <View style={styles.card}>
      <Text style={styles.word}>{result.word}</Text>

      <Text style={styles.phonetic}>
        {result.phonetic || "No phonetic available"}
      </Text>

      <Text style={styles.heading}>Part of Speech</Text>
      <Text>{result.meanings[0].partOfSpeech}</Text>

      <Text style={styles.heading}>Definition</Text>
      <Text>{result.meanings[0].definitions[0].definition}</Text>

      {result.meanings[0].definitions[0].example && (
        <>
          <Text style={styles.heading}>Example</Text>
          <Text>{result.meanings[0].definitions[0].example}</Text>
        </>
      )}
      
      <TouchableOpacity
        style={styles.button}
        onPress={playAudio}
      >
     <Text style={styles.buttonText}>
        🔊 Play Pronunciation
     </Text>
     </TouchableOpacity>
     
      <TouchableOpacity
        style={styles.button}
        onPress={handleFavorite}
      >
        <Text style={styles.buttonText}>
          ⭐ Add to Favorites
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 25,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    elevation: 4,
  },

  word: {
    fontSize: 28,
    fontWeight: "bold",
  },

  phonetic: {
    color: "gray",
    marginTop: 5,
    marginBottom: 15,
  },

  heading: {
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 5,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#4F46E5",
    padding: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});