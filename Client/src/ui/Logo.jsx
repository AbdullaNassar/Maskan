import { useNavigate } from "react-router-dom";
import { useTheme } from "../features/theme/useTheme";
import { useTranslation } from "react-i18next";

import logo from "/imgs/logo.svg";
import logoBlack from "/imgs/logoBlack.svg";
import logoar from "/imgs/logoar.svg";
import logoardark from "/imgs/logoardark.svg";

export default function Logo() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  return (
    <button
      onClick={() => navigate("/")}
      className="cursor-pointer hidden md:block md:w-48 "
    >
      <img
        src={
          theme === "light"
            ? i18n.language === "en"
              ? logo
              : logoar
            : i18n.language === "en"
            ? logoBlack
            : logoardark
        }
        className="w-full"
        alt="Maskn Logo"
      />
    </button>
  );
}
