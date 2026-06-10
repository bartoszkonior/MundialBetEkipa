import { getCookie } from "../hooks/useCookie";

export async function getHistoryAnswers(id) {
  const token = await getCookie("jwtToken");
  const res = await fetch(
    `https://api.turniej.betekipa.pl/api/match/history/${id}`,
    {
      // Append id as a query parameter
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
}
