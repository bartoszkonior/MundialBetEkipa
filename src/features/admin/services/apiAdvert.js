import { getCookie } from "../../../hooks/useCookie";

export async function addAdvert({ formData }) {
  const token = await getCookie("jwtToken");

  try {
    const response = await fetch(
      "https://api.turniej.betekipa.pl/api/admin/advert",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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
