import { getCookie } from "../hooks/useCookie";

export async function getAnswers() {
  const token = await getCookie("jwtToken");

  const res = await fetch(
    `https://api.turniej.betekipa.pl/api/match/get-answers`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return data;
}

export async function sendAnswers(answers) {
  const token = await getCookie("jwtToken");

  const res = await fetch(
    "https://api.turniej.betekipa.pl/api/match/send-answers",
    {
      method: "POST", // Określenie metody HTTP
      headers: {
        "Content-Type": "application/json", // Typ treści JSON
        Authorization: `Bearer ${token}`, // Nagłówek z tokenem
      },
      body: JSON.stringify({ answers }), // Konwersja danych do formatu JSON
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.text();
  return data;
}
