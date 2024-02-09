import styled from "styled-components";

import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  grid-row: 1/-1;
  padding: 3.2rem 2.4rem;
  border-right: 1px var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
