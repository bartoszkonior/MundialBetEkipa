import { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaStar, FaRegStar } from "react-icons/fa"; // Dodanie ikon gwiazdki
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFollowUser } from "./useFollowUser";
import { useProfile } from "../profile/useProfile";
import { useUnfollowUser } from "./useUnfollowUser";

const StyledUserProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4.8rem;

  @media (max-width: 34em) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
  }
`;

const BackBtn = styled.div`
  height: 6.4rem;
  width: 6.4rem;
  background-color: var(--color-shadow);
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const BtnMobile = styled.div`
  height: 6.4rem;
  width: 6.4rem;
  background-color: var(--color-shadow);
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: block;
`;

const StyledArrow = styled(IoIosArrowRoundBack)`
  font-size: 5.2rem;
  color: white;
`;

const RankingTitleText = styled.p`
  font-weight: 400;
  font-size: 1.6rem;
  color: var(--color-text-light);

  @media (max-width: 34em) {
    font-size: 1.4rem;
  }
`;

const ProfileInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2.4rem;
`;

const ProfileRankBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
  height: 6.4rem;
  width: 6.4rem;
  border-radius: 999px;
`;

const ProfileUsername = styled.span`
  color: var(--color-text-light);
  font-size: 3.2rem;
  font-weight: 700;

  @media (max-width: 34em) {
    font-size: 2.4rem;
  }
`;

const FollowBox = styled.div`
  width: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const FollowText = styled.span`
  font-size: 1.6rem;
  color: var(--color-text-light);
  margin-top: 0.8rem;
`;

const Flex = styled.div`
  display: contents;
  @media (max-width: 34em) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

function UserProfileHeader({ profile }) {
  profile = {
    ...profile,
    phasePoints: profile?.points || null,
  };

  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false); // Stan do przechowywania informacji o obserwowaniu
  const { followUser, isPending: isFollowingPending } = useFollowUser();
  const { unfollowUser, isPending: isUnfollowingPending } = useUnfollowUser();
  const { data, isPending: isLoadingProfile, refetch } = useProfile();

  useEffect(() => {
    if (!isLoadingProfile) {
      const followed = data.followers.some(
        (user) => user.userFollowed === profile.id
      );
      setIsFollowing(followed);
    }
  }, [data, isLoadingProfile, profile.id, refetch]);

  const handleFollowClick = () => {
    if (isFollowing === false) {
      followUser(profile.id);
      setIsFollowing(true);
    } else if (isFollowing === true) {
      unfollowUser(profile.id);
      setIsFollowing(false);
    }
  };

  if (!isFollowingPending || !isUnfollowingPending) refetch();

  // console.log(profile);

  return (
    <StyledUserProfileHeader>
      {/* <BtnMobile onClick={() => navigate("/profil")}>
        <StyledArrow />
      </BtnMobile> */}
      <BackBtn onClick={() => navigate(-1)}>
        <StyledArrow />
      </BackBtn>
      <Flex>
        <ProfileInfoBox>
          <Avatar
            src={`https://flagicons.lipis.dev/flags/1x1/${profile.avatarId}.svg`}
            alt={`${profile.userName} avatar`}
          />
          <ProfileRankBox>
            <ProfileUsername>{profile.userName}</ProfileUsername>
            {profile.id != 8 ? (
              <RankingTitleText>
                {profile.ranking}. miejsce w rankingu{" "}
              </RankingTitleText>
            ) : (
              ""
            )}
          </ProfileRankBox>
        </ProfileInfoBox>

        <FollowBox
          onClick={handleFollowClick}
          aria-disabled={isFollowingPending || isUnfollowingPending}
        >
          {isFollowing ? (
            <FaStar size={32} color="#DBAC34" /> // Wypełniona gwiazdka
          ) : (
            <FaRegStar size={32} color="#DBAC34" /> // Pusta gwiazdka
          )}
          <FollowText>
            {isFollowing ? "Obserwujesz" : "Obserwuj"} {/* Zmiana tekstu */}
          </FollowText>
        </FollowBox>
      </Flex>
    </StyledUserProfileHeader>
  );
}

export default UserProfileHeader;
