import { getCookie } from "../hooks/useCookie";

export async function getAdvert() {
  try {
    const token = await getCookie("jwtToken");

    const res = await fetch(
      `https://api.turniej.betekipa.pl/api/match/advert`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Sprawdź, czy odpowiedź jest poprawna
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text();

    // Sprawdź, czy odpowiedź nie jest pusta przed parsowaniem jako JSON
    if (text.trim() === "") {
      return null;
    }

    // Próba parsowania odpowiedzi jako JSON
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    // Obsłuż błąd i zwróć null
    console.error("Failed to fetch advert data:", error);
    return null;
  }
}
