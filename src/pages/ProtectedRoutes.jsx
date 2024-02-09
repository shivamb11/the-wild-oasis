import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Spinner from "../ui/Spinner.jsx";

import { useUser } from "../features/authentication/useUser.js";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoutes({ children }) {
  const { isAuthenticated, isFetchingUser, fetchStatus } = useUser();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isFetchingUser && fetchStatus !== "fetching") {
        navigate("/login", { replace: true });
      }
    },
    [isAuthenticated, isFetchingUser, fetchStatus, navigate]
  );

  if (isFetchingUser) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return children;
}

export default ProtectedRoutes;
