import { HiArrowRightOnRectangle } from "react-icons/hi2";

import ButtonIcon from "../../ui/ButtonIcon.jsx";

import { useLogout } from "./useLogout.js";

function Logout() {
  const { logoutMutate, isLogouting } = useLogout();

  return (
    <ButtonIcon onClick={logoutMutate} disabled={isLogouting}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
