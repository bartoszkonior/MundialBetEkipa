import { useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useSearch } from "../features/profile/useSearch";

const StyledSearchbar = styled.form`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  margin-bottom: 1.2rem;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.4rem 2.8rem 1.4rem 4.8rem;
  background-color: #fff;
  border: 2px solid var(--color-primary);
  border-radius: 999px;

  &:focus {
    outline: none;
  }
`;

const ClearIcon = styled(IoIosClose)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.8rem;
  cursor: pointer;
  color: var(--color-primary);
  z-index: 1;
`;

const UserList = styled.ul`
  position: absolute;
  top: 117%;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 16px;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 30rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const UserListElement = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 1.8rem 3.8rem;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(23, 67, 65, 0.1);
  }
`;

const Avatar = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 999px;
`;

const Ranking = styled.span`
  color: var(--color-primary);
  font-weight: 700;
  width: 5rem;
`;

const Username = styled.span`
  color: var(--color-primary);
  font-weight: 500;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
`;

const ProfileIcon = styled(IoIosArrowForward)`
  font-size: 3.2rem;
`;

function Searchbar() {
  const { data: users } = useSearch();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleUserClick = (userName) => {
    navigate(`/użytkownik/${userName}`);
    setSearchTerm("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.blur(); // Odfokusowanie pola tekstowego
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const filteredUsers =
    searchTerm.length >= 3
      ? users.filter((user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <>
      <div style={{ position: "relative" }}>
        <StyledSearchbar onSubmit={handleSubmit}>
          <InputContainer>
            <span
              style={{
                position: "absolute",
                left: "1rem",
                top: "60%",
                transform: "translateY(-50%)",
                fontSize: "3.6rem",
                cursor: "pointer",
                zIndex: 1,
              }}
            >
              <CiSearch />
            </span>
            <Input
              type="text"
              id="searchUser"
              placeholder="Wpisz nick, aby wyszukać typera"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              ref={inputRef} // Dodanie ref
            />
            {searchTerm && <ClearIcon onClick={handleClearSearch} />}
          </InputContainer>
        </StyledSearchbar>

        {searchTerm && (
          <UserList>
            {filteredUsers.map((user) => (
              <UserListElement
                key={user.id}
                onClick={() => handleUserClick(user.userName)}
              >
                <ProfileContainer>
                  {user.id != 8 ? (
                    <Ranking>{user.ranking}.</Ranking>
                  ) : (
                    <Ranking></Ranking>
                  )}

                  <Profile>
                    <Avatar
                      src={`https://flagicons.lipis.dev/flags/1x1/${user.avatarId}.svg`}
                    />
                    <Username>{user.userName}</Username>
                  </Profile>
                </ProfileContainer>
                <ProfileIcon />
              </UserListElement>
            ))}
          </UserList>
        )}
      </div>
    </>
  );
}

export default Searchbar;
