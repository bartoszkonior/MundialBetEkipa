import { getCookie } from "../hooks/useCookie";

export async function getSearch() {
  const token = await getCookie("jwtToken");
  const res = await fetch(
    "https://api.turniej.betekipa.pl/api/match/search-user",
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
