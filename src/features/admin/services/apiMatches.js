import { getCookie } from "../../../hooks/useCookie";

export async function getMatches() {
  const token = await getCookie("jwtToken");
  const response = await fetch(
    "https://api.turniej.betekipa.pl/api/admin/match",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data;
}
