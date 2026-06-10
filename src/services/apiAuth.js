import {
  getCookie,
  decodeToken,
  deleteCookie,
  setCookie,
} from "../hooks/useCookie";

export async function signup({
  fullName,
  email,
  avatarId,
  phoneNumber,
  userName,
  password,
  loginBetclic,
  gender,
}) {
  try {
    const res = await fetch(
      "https://api.turniej.betekipa.pl/api/account/register",
      {
        method: "POST",
        body: JSON.stringify({
          fullName,
          email,
          avatarId,
          phoneNumber,
          userName,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // If the response is not okay, throw the full error data
    if (!res.ok) {
      let data = await res.json();
      throw data.errors; // Throw the entire errors object
    }
    const data = await res.text();

    return data;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to be caught by useMutation
  }
}

export async function login({ email, password, dontLogOut }) {
  try {
    const res = await fetch(
      "https://api.turniej.betekipa.pl/api/account/login",
      {
        method: "POST",
        body: JSON.stringify({ output: email, password, dontLogOut }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const contentType = res.headers.get("content-type");

      // Sprawdź, czy odpowiedź jest w formacie JSON
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        throw new Error(data.errors?.[0]?.message || "Wystąpił błąd.");
      } else {
        // Jeśli nie jest to JSON, odczytaj jako tekst
        const errorMessage = await res.text();
        throw new Error(errorMessage);
      }
    }

    const token = await res.text();

    if (dontLogOut) {
      setCookie("jwtToken", token, 7); // 7 dni
    } else {
      setCookie("jwtToken", token, 1); // 1 dzień (sesja dzienna)
    }

    return token;
  } catch (error) {
    throw error;
  }
}

export async function getCurrentUser() {
  const token = await getCookie("jwtToken");

  if (!token) return null;

  const convertedToken = await decodeToken(token);

  return convertedToken;
}

export async function logout() {
  await deleteCookie("jwtToken");
}

export async function forgotPassword({ email }) {
  try {
    const res = await fetch(
      "https://api.turniej.betekipa.pl/api/account/forgot-password",
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Email not found");
      } else {
        throw new Error("Something went wrong");
      }
    }

    const data = await res.text();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function resetPassword({ password, token }) {
  try {
    const res = await fetch(
      "https://api.turniej.betekipa.pl/api/account/reset-password",
      {
        method: "POST",
        body: JSON.stringify({ password, token }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw Error();
    }

    const data = await res.text();
    return data;
  } catch (error) {
    throw error;
  }
}
