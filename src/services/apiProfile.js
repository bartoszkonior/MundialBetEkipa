import { getCookie } from "../hooks/useCookie";

export async function getProfile() {
  const token = await getCookie("jwtToken");
  const res = await fetch(
    "https://api.turniej.betekipa.pl/api/match/get-profile",
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

export async function getActiveMatches() {
  const token = await getCookie("jwtToken");
  const res = await fetch(
    "https://api.turniej.betekipa.pl/api/match/get-matches-by-date",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  // console.log(data);
  return data;
}

export async function getTime() {
  const token = await getCookie("jwtToken");
  const res = await fetch("https://api.turniej.betekipa.pl/api/match/time", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.text();
  return data;
}
