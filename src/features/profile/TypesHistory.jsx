import { useHistoryAnswers } from "./useHistoryAnswers";
import Accordion from "../../ui/Accordion";
import Spinner from "../../ui/Spinner";
import { useActiveMatches } from "./useActiveMatches";
import { groupMatchesByPhase } from "../../services/helper";
import { useTime } from "./useTime";

function TypesHistory({ id, userFollow = null }) {
  const { data, isPending } = useHistoryAnswers(id);

  if (isPending) return <Spinner />;

  const phaseMap = {};

  data?.dateGroups?.forEach((group) => {
    group.matches?.forEach((match) => {
      const phase = match.phaseName || "Inne";
      if (!phaseMap[phase]) {
        phaseMap[phase] = {
          phaseName: phase,
          matches: [],
          userAnswers: group.userAnswers,
          userMatchDayPoints: group.userMatchDayPoints ?? 0,
          matchDayPoints: group.matchDayPoints ?? 0,
        };
      }
      phaseMap[phase].matches.push(match);
    });
  });

  const enrichedDateGroups = Object.values(phaseMap).sort((a, b) => {
    const numA = parseInt(a.phaseName?.match(/\d+/)?.[0] ?? "0");
    const numB = parseInt(b.phaseName?.match(/\d+/)?.[0] ?? "0");
    return numA - numB;
  });

  return <Accordion data={enrichedDateGroups} sortOrder="desc" />;
}

export default TypesHistory;
