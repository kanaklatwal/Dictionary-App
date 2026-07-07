const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

export async function searchWord(word: string) {
  const response = await fetch(`${BASE_URL}/${word}`);

  if (!response.ok) {
    throw new Error("Word not found");
  }

  return await response.json();
}