import { GoTrophy } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProfile } from "./useProfile";
import { FaTableList } from "react-icons/fa6";
import { FaListOl } from "react-icons/fa";
import { LiaListOlSolid } from "react-icons/lia";
import { MdOutlineLeaderboard } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { CiMedal } from "react-icons/ci";
import { RiMedalLine } from "react-icons/ri";

const StyledProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4.8rem;
  color: #fff;

  @media (max-width: 34em) {
    flex-direction: column;
    gap: 2.4rem;
    margin-bottom: 2.4rem;
  }
`;

const ProfileName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.8rem;
  align-self: flex-start;
`;

const ProfileMenu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4.8rem;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.6rem;
  }

  span {
    font-size: 1.6rem;
  }

  @media (max-width: 34em) {
    align-items: start;
    gap: 4.2rem;
  }
`;

const Avatar = styled.img`
  height: 6.4rem;
  width: 6.4rem;
  border-radius: 999px;
  object-fit: contain;
  object-position: center;
`;

const ProfileDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Nickname = styled.div`
  font-size: 3.2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const RankingPlace = styled.div`
  font-size: 1.6rem;
`;

function ProfileHeader() {
  const { data, isPending } = useProfile();

  return (
    <StyledProfileHeader>
      {!isPending && (
        <ProfileName>
          <Avatar
            src={`https://flagicons.lipis.dev/flags/1x1/${data.avatarId}.svg`}
          />
          <ProfileDataContainer>
            <Nickname>{data.userName}</Nickname>
            <RankingPlace>
              {data?.ranking}. miejsce w rankingu typerów
            </RankingPlace>
          </ProfileDataContainer>
        </ProfileName>
      )}
      <ProfileMenu>
        <Link to="/obserwowani">
          <HiOutlineUserGroup size="4rem" />
          <span>Obserwowani</span>
        </Link>

        <Link to="/ranking">
          <GoTrophy size="4rem" />
          <span>Ranking</span>
        </Link>
      </ProfileMenu>
    </StyledProfileHeader>
  );
}

export default ProfileHeader;
