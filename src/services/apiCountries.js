export async function getAllCountries() {
  const res = await fetch(
    `https://sports.bzzoiro.com/api/v2/teams?league_id=27`,
    {
      method: "GET",
      headers: {
        Authorization: `Token e6d4041cbfeae3ef18f5e633ccc8ef45eab4b208`,
      },
    }
  );

  const data = await res.json();
  return data.results;
}
