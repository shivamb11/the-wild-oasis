import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import ButtonIcon from "./ButtonIcon.jsx";

import { useDarkMode } from "../context/DarkModeContext.jsx";

function DarkModeToggle() {
  const { isDarkMode, handleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={handleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
