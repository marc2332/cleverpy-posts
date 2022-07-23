import { useRouter } from "next/router";
import { Edit, Moon, Sun, X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import Button from "./Button";
import { BigTitle } from "./Title";
import { setEditMode, StoreState, Themes, toggleTheme } from "../store/store";

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonsList = styled.nav`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const config = useSelector((state: StoreState) => state.config);
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

  function enableEditMode() {
    dispatch(setEditMode(!config.editMode));
  }

  return (
    <NavbarContainer>
      <BigTitle onClick={goBack}>Posts</BigTitle>
      <ButtonsList>
        <Button expanded={false} onClick={themeOnClick}>
          {config.theme === Themes.Dark ? (
            <Sun color={theme.icon.color} />
          ) : (
            <Moon color={theme.icon.color} />
          )}
        </Button>
        <Button expanded={false} onClick={enableEditMode}>
          {config.editMode ? (
            <X color={theme.icon.color} />
          ) : (
            <Edit color={theme.icon.color} />
          )}
        </Button>
      </ButtonsList>
    </NavbarContainer>
  );
}
