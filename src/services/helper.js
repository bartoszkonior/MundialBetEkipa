export function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0"); // Dzień z zerem wiodącym
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Miesiąc z zerem wiodącym
  return `${day}.${month}`;
}

export function countCorrectAnswers(dateGroup) {
  return dateGroup.userAnswers.filter((answer) => answer.isCorrect === 1)
    .length;
}

export function countWrongAnswers(dateGroup) {
  return dateGroup.userAnswers.filter((answer) => answer.isCorrect === 0)
    .length;
}

export function countPendingAnswers(dateGroup) {
  return dateGroup.userAnswers.filter((answer) => answer.isCorrect === 2)
    .length;
}

// export function countMidAnswers(dateGroup) {
//   return dateGroup.userAnswers.filter((answer) => answer.isCorrect === 3)
//     .length;
// }

export function countAllAnswers(dateGroup) {
  return dateGroup.userAnswers.length;
}

export function countCorrectAnswersForMatch(dateGroup, matchName) {
  // Znajdź mecz według nazwy
  const match = dateGroup.matches.find((m) => m.name === matchName);

  // Zbierz identyfikatory pytań dla znalezionego meczu
  const questionIds = match.questions.map((q) => q.id);

  // Zlicz poprawne odpowiedzi przypisane do pytań tego meczu
  const correctAnswersCount = dateGroup.userAnswers.filter(
    (answer) =>
      questionIds.includes(answer.questionId) && answer.isCorrect === 1
  ).length;

  return correctAnswersCount;
}

export function countWrongAnswersForMatch(dateGroup, matchName) {
  // Znajdź mecz według nazwy
  const match = dateGroup.matches.find((m) => m.name === matchName);

  // Zbierz identyfikatory pytań dla znalezionego meczu
  const questionIds = match.questions.map((q) => q.id);

  // Zlicz poprawne odpowiedzi przypisane do pytań tego meczu
  const correctAnswersCount = dateGroup.userAnswers.filter(
    (answer) =>
      questionIds.includes(answer.questionId) && answer.isCorrect === 0
  ).length;

  return correctAnswersCount;
}

export function countPendingAnswersForMatch(dateGroup, matchName) {
  // Znajdź mecz według nazwy
  const match = dateGroup.matches.find((m) => m.name === matchName);

  // Zbierz identyfikatory pytań dla znalezionego meczu
  const questionIds = match.questions.map((q) => q.id);

  // Zlicz poprawne odpowiedzi przypisane do pytań tego meczu
  const correctAnswersCount = dateGroup.userAnswers.filter(
    (answer) =>
      questionIds.includes(answer.questionId) && answer.isCorrect === 2
  ).length;

  return correctAnswersCount;
}

// export function countMidAnswersForMatch(dateGroup, matchName) {
//   // Znajdź mecz według nazwy
//   const match = dateGroup.matches.find((m) => m.name === matchName);

//   // Zbierz identyfikatory pytań dla znalezionego meczu
//   const questionIds = match.questions.map((q) => q.id);

//   // Zlicz poprawne odpowiedzi przypisane do pytań tego meczu
//   const correctAnswersCount = dateGroup.userAnswers.filter(
//     (answer) =>
//       questionIds.includes(answer.questionId) && answer.isCorrect === 3
//   ).length;

//   return correctAnswersCount;
// }

export function countCorrectAnswersForActiveMatch(
  dateGroup,
  matchName,
  userAnswers
) {
  // Znajdź mecz według nazwy
  const match = dateGroup.find((m) => m.name === matchName);

  // Zbierz identyfikatory pytań dla znalezionego meczu
  const questionIds = match.questions.map((q) => q.id);

  // Zlicz poprawne odpowiedzi przypisane do pytań tego meczu
  const correctAnswersCount = userAnswers.filter(
    (answer) =>
      questionIds.includes(answer.questionId) &&
      match.questions
        .find((q) => q.id === answer.questionId)
        ?.answers.find((a) => a.id === answer.answerId).isCorrect === 1
  ).length;

  return correctAnswersCount;
}

export function countWrongAnswersForActiveMatch(
  dateGroup,
  matchName,
  userAnswers
) {
  // Znajdź mecz według nazwy
  const match = dateGroup.find((m) => m.name === matchName);

  // Zbierz identyfikatory pytań dla znalezionego meczu
  const questionIds = match.questions.map((q) => q.id);

  // Zlicz poprawne odpowiedzi przypisane do pytań tego meczu
  const incorrectAnswersCount = userAnswers.filter(
    (answer) =>
      questionIds.includes(answer.questionId) &&
      !match.questions
        .find((q) => q.id === answer.questionId)
        ?.answers.find((a) => a.id === answer.answerId).isCorrect === 0
  ).length;

  return incorrectAnswersCount;
}

export function getUserAnswersForQuestion(userAnswers, questionId) {
  return userAnswers.filter((answer) => answer.questionId === questionId);
}

export function getNextMatchDate(groupedMatches, startDate) {
  const dates = Object.keys(groupedMatches);
  const sortedDates = dates.sort(
    (a, b) =>
      new Date(`2024-${a.split(".").reverse().join("-")}`) -
      new Date(`2024-${b.split(".").reverse().join("-")}`)
  );
  return (
    sortedDates.find((date) =>
      groupedMatches[date].some(
        // Zmienione isChecked
        (match) => match.questions.length > 0
      )
    ) || null
  );
}

export function groupMatchesByPhase(matches) {
  const sorted = [...matches].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sorted.reduce((acc, match) => {
    const phase = match.phaseName; // "Kolejka 1", "1/16 finału" itd.
    if (!acc[phase]) acc[phase] = [];
    acc[phase].push(match);
    return acc;
  }, {});
}

// src/utils/countryName.js

const translations = {
  Algeria: "Algieria",
  Argentina: "Argentyna",
  Australia: "Australia",
  Austria: "Austria",
  Belgium: "Belgia",
  "Bosnia & Herzegovina": "Bośnia",
  Brazil: "Brazylia",
  Canada: "Kanada",
  "Cabo Verde": "Cabo Verde",
  Colombia: "Kolumbia",
  "Côte d'Ivoire": "WKS",
  Croatia: "Chorwacja",
  Curaçao: "Curaçao",
  Czechia: "Czechy",
  "DR Congo": "DR Konga",
  Ecuador: "Ekwador",
  Egypt: "Egipt",
  England: "Anglia",
  France: "Francja",
  Germany: "Niemcy",
  Ghana: "Ghana",
  Haiti: "Haiti",
  Iran: "Iran",
  Iraq: "Irak",
  Japan: "Japonia",
  Jordan: "Jordania",
  Mexico: "Meksyk",
  Morocco: "Maroko",
  Netherlands: "Holandia",
  "New Zealand": "Nowa Zelandia",
  Norway: "Norwegia",
  Panama: "Panama",
  Paraguay: "Paragwaj",
  Portugal: "Portugalia",
  Qatar: "Katar",
  "Saudi Arabia": "Arabia",
  Scotland: "Szkocja",
  Senegal: "Senegal",
  "South Africa": "RPA",
  "South Korea": "Korea",
  Spain: "Hiszpania",
  Sweden: "Szwecja",
  Switzerland: "Szwajcaria",
  Tunisia: "Tunezja",
  Türkiye: "Turcja",
  Uruguay: "Urugwaj",
  USA: "USA",
  Uzbekistan: "Uzbekistan",
};

export function getPolishName(englishName) {
  return translations[englishName] ?? englishName;
}
