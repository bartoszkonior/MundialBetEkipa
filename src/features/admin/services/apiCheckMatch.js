import { getCookie } from "../../../hooks/useCookie";

export async function checkMatch(answers) {
  const token = await getCookie("jwtToken");
  try {
    const response = await fetch(
      `https://api.turniej.betekipa.pl/api/admin/check-answers`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData.message || "An error occurred");
    }

    const data = await response.text();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function checkMatchFinal(matchID) {
  const token = await getCookie("jwtToken");

  try {
    const response = await fetch(
      `https://api.turniej.betekipa.pl/api/admin/check-match/${matchID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData.message || "An error occurred");
    }

    const data = await response.text();
    return data;
  } catch (error) {
    throw error;
  }
}
