import { useRouter } from "next/router";
import { Moon, Sun } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import Button from "./Button";
import { BigTitle } from "./Title";
import { StoreState, Themes, toggleTheme } from "../store/store";

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedTheme = useSelector((state: StoreState) => state.theme.theme);
  const theme = useTheme();

  const isNotHome = router.pathname !== "/";

  function goBack() {
    if (isNotHome) {
      router.back();
    }
  }

  function themeOnClick() {
    dispatch(toggleTheme());
  }

  return (
    <NavbarContainer>
      <BigTitle onClick={goBack}>Posts</BigTitle>
      <Button expanded={false} onClick={themeOnClick}>
        {selectedTheme === Themes.Dark ? (
          <Sun color={theme.icon.color} />
        ) : (
          <Moon color={theme.icon.color} />
        )}
      </Button>
    </NavbarContainer>
  );
}
