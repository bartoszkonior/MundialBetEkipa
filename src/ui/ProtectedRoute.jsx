import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import SpinnerMini from "./SpinnerMini";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isPending, isAuthenticated, user } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isPending && user !== undefined)
        navigate("/logowanie", { replace: true });
    },
    [isAuthenticated, isPending, user, navigate]
  );

  if (isPending)
    return (
      <FullPage>
        <SpinnerMini />;
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
