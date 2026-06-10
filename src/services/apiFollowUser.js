import { getCookie } from "../hooks/useCookie";

export async function followUser(userId) {
  const token = await getCookie("jwtToken");

  try {
    const response = await fetch(
      "https://api.turniej.betekipa.pl/api/match/follow-user",
      {
        method: "POST", // Określenie metody HTTP
        headers: {
          "Content-Type": "application/json", // Typ treści JSON
          Authorization: `Bearer ${token}`, // Nagłówek z tokenem
        },
        body: JSON.stringify({ followedId: userId }), // Konwersja danych do formatu JSON
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    // Obsługa błędów
    throw error; // Możesz również zwrócić błędne dane lub komunikat
  }
}

export async function unfollowUser(userId) {
  const token = await getCookie("jwtToken");

  try {
    const response = await fetch(
      "https://api.turniej.betekipa.pl/api/match/unfollow-user",
      {
        method: "DELETE", // Określenie metody HTTP
        headers: {
          "Content-Type": "application/json", // Typ treści JSON
          Authorization: `Bearer ${token}`, // Nagłówek z tokenem
        },
        body: JSON.stringify({ followedId: userId }), // Konwersja danych do formatu JSON
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    // Obsługa błędów
    throw error; // Możesz również zwrócić błędne dane lub komunikat
  }
}
