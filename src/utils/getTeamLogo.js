import codes from "./codes.json";

export const COUNTRY_CODES = Object.entries(codes).reduce(
  (acc, [code, name]) => {
    acc[name] = code;
    return acc;
  },
  {}
);

export const getTeamLogo = (teamName) => {
  if (!teamName) return "";

  const code = COUNTRY_CODES[teamName];
  if (code) {
    return `https://flagicons.lipis.dev/flags/4x3/${code}.svg`;
  }

  // jeśli to nie reprezentacja, spróbuj lokalnego herbu
  return `/data/clubs/${teamName}.png`;
};
