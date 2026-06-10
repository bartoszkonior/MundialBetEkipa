// import { useEffect, useState } from "react";
import styled from "styled-components";
import TypesBox from "../ui/TypesBox";
import ProfileHeader from "../features/profile/ProfileHeader";
import TypesHistory from "../features/profile/TypesHistory";
import { useProfile } from "../features/profile/useProfile";
import Spinner from "../ui/Spinner";
import Searchbar from "../ui/Searchbar";
import Matches from "../features/profile/Matches";
import { useActiveMatches } from "../features/profile/useActiveMatches";
import ScrollView from "../ui/ScrollView";
// import { useQueryClient } from "@tanstack/react-query";
// import { ModalWindow } from "../ui/ModalWindow";
// import AdvertModal from "../features/advert/AdvertModal";
// import { useAdvert } from "../features/advert/useAdvert";
// import { useUser } from "../features/authentication/useUser";

const StyledProfile = styled.div`
  padding: 0 1.6rem;
  max-width: 120rem;
  margin: 8rem auto;

  @media (max-width: 34em) {
    margin: 2rem auto;
  }
`;

const HistoryHeading = styled.p`
  color: #fff;
  font-weight: 600;
`;

function Profile() {
  const { data: profile, isPending } = useProfile();
  const { matches } = useActiveMatches();
  // const queryClient = useQueryClient();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const { advertData, isLoadingAdvert } = useAdvert();

  // Synchronizowanie lokalnego stanu z queryClient
  // useEffect(() => {
  //   const showAdvert = queryClient.getQueryData(["advertOpen"]);
  //   setIsModalOpen(showAdvert);
  // }, [queryClient]);

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   queryClient.setQueryData(["advertOpen"], false);
  // };

  // Sprawdzenie, czy są mecze z pytaniami i nie zostały jeszcze sprawdzone
  const hasMatchesWithQuestionsAdmin = matches?.some(
    (match) => match.questions.length > 0 && !match.isChecked
  );

  return (
    <StyledProfile>
      <Searchbar />
      <TypesBox>
        {isPending && <Spinner />}
        {!isPending && (
          <>
            <ProfileHeader />
            <ScrollView>
              {hasMatchesWithQuestionsAdmin && <Matches />}
              <HistoryHeading>Historia typów</HistoryHeading>
              <TypesHistory id={profile.id} />
            </ScrollView>
          </>
        )}
      </TypesBox>

      {/* Modal z reklamą */}
      {/* {isModalOpen && !isLoadingAdvert && advertData && (
        <ModalWindow onClose={handleCloseModal}>
          <AdvertModal onClose={handleCloseModal} />
        </ModalWindow>
      )} */}
    </StyledProfile>
  );
}

export default Profile;
