import { getCookie } from "../../../hooks/useCookie";

export async function addMatch({ matchData, selectedMatch }) {
  try {
    const token = await getCookie("jwtToken");
    const response = await fetch(
      `https://api.turniej.betekipa.pl/api/admin/match/${selectedMatch.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matchData),
      }
    );

    if (!response.ok) {
      // Sprawdź, czy odpowiedź z serwera jest poprawna
      const errorData = await response.text();
      throw new Error(
        `Error: ${response.status} - ${errorData.message || "Unknown error"}`
      );
    }

    const data = await response.text();
    return data;
  } catch (error) {
    // Możesz również rzucić błąd lub zwrócić odpowiedni obiekt błędu w zależności od potrzeb
    throw error;
  }
}
