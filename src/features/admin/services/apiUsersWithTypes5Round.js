import { getCookie } from "../../../hooks/useCookie";

export async function getUsersWithTypes5Round() {
  const token = await getCookie("jwtToken");
  const response = await fetch(
    "https://api.turniej.betekipa.pl/api/admin/user-list-phases",
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
