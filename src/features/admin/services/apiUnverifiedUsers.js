import { getCookie } from "../../../hooks/useCookie";

export async function getUnverifiedUsers() {
  const token = await getCookie("jwtToken");
  const response = await fetch(
    "https://api.turniej.betekipa.pl/api/admin/get-unverified-users",
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

export async function verifyUser(id) {
  const token = await getCookie("jwtToken");
  const response = await fetch(
    `https://api.turniej.betekipa.pl/api/admin/user/${id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData.message || "An error occurred");
  }

  const data = await response.text();
  return data;
}
