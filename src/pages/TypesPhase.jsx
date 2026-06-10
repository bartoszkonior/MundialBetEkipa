import { useNavigate, useParams } from "react-router-dom";
import { useActiveMatches } from "../features/profile/useActiveMatches";
import { useTime } from "../features/profile/useTime";
import { useAnswers } from "../features/profile/useAnswers";
import { useSendAnswers } from "../features/types/useSendAnswers";
import Spinner from "../ui/Spinner";
import TypesBox from "../ui/TypesBox";
import TypesHeader from "../features/types/TypesHeader";
import TypesForm from "../features/types/TypesForm";
import styled from "styled-components";
import { useEffect } from "react";

const StyledTypes = styled.div`
  padding: 0 1.6rem;
  max-width: 120rem;
  margin: 8rem auto;
  @media (max-width: 34em) {
    margin: 2rem auto;
  }
`;

function TypesPhase() {
  const { phaseName } = useParams();
  const decodedPhaseName = decodeURIComponent(phaseName);
  const { matches, isLoadingMatches } = useActiveMatches();
  const { time, isLoadingTime } = useTime();
  const { data: answers, isPending: isLoadingAnswers } = useAnswers();
  const { sendAnswers, isSending } = useSendAnswers();
  const navigate = useNavigate();

  const phaseMatches =
    matches?.filter(
      (m) =>
        m.phaseName === decodedPhaseName &&
        new Date(time) < new Date(m.date) &&
        m.questions.length > 0 &&
        !m.isChecked
    ) || [];

  useEffect(() => {
    if (
      !isLoadingMatches &&
      !isLoadingTime &&
      !isLoadingAnswers &&
      !phaseMatches.length
    ) {
      navigate("/profil");
    }
  }, [
    phaseMatches.length,
    isLoadingMatches,
    isLoadingTime,
    isLoadingAnswers,
    navigate,
  ]);

  if (isLoadingMatches || isLoadingTime || isLoadingAnswers) return <Spinner />;

  return (
    <StyledTypes>
      <TypesBox>
        <TypesHeader data={phaseMatches} />
        <TypesForm
          phaseMatches={phaseMatches}
          answers={answers}
          sendAnswers={sendAnswers}
          isSending={isSending}
        />
      </TypesBox>
    </StyledTypes>
  );
}

export default TypesPhase;
