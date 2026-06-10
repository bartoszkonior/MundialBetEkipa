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

function AdminRoute({ children }) {
  const navigate = useNavigate();

  const { isPending, isAdmin } = useUser();

  useEffect(
    function () {
      if (!isAdmin && !isPending) navigate("/", { replace: true });
    },
    [isAdmin, isPending, navigate]
  );

  if (isPending)
    return (
      <FullPage>
        <SpinnerMini />;
      </FullPage>
    );

  if (isAdmin) return children;
}

export default AdminRoute;
