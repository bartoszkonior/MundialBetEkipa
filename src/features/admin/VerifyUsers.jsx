import { useState } from "react";
import styled from "styled-components";
import TypesBox from "../../ui/TypesBox";
import { useUnverifiedUsers } from "./useUnverifiedUsers";
import Item from "../../ui/Item";
import ScrollView from "../../ui/ScrollView";
import Button from "../../ui/Button";
import { useVerifyUser } from "./useVerifyUser";

const StyledVerifyUsers = styled.div`
  padding: 1rem 1.6rem;
  max-width: 120rem;
  margin: 8rem auto;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  border: 2px solid var(--color-primary);
  border-radius: 8px;
`;

const UserList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Text = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 34em) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

const El = styled.span``;

function VerifyUsers() {
  const { data, isPending, refetch } = useUnverifiedUsers();
  const { verifyUser, isPending: isVerifing } = useVerifyUser(refetch);
  const [searchTerm, setSearchTerm] = useState("");

  if (isPending) return <div>Loading...</div>;

  // Function to filter users based on the search term
  const filteredUsers = data.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.userName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.fullName.toLowerCase().includes(searchLower)
    );
  });

  return (
    <StyledVerifyUsers>
      <TypesBox>
        <SearchBar
          type="text"
          placeholder="Wyszukaj"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ScrollView>
          <UserList>
            {filteredUsers.map((user) => (
              <Item key={user.id}>
                <Text>
                  <El>{user.fullName}</El>
                  <El>{user.userName}</El>
                  <El>{user.email}</El>
                  <Button
                    variation="outline"
                    onClick={() => {
                      verifyUser(user.id);
                    }}
                    disabled={isVerifing}
                  >
                    Zweryfikuj
                  </Button>
                </Text>
              </Item>
            ))}
          </UserList>
        </ScrollView>
      </TypesBox>
    </StyledVerifyUsers>
  );
}

export default VerifyUsers;
