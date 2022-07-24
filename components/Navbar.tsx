import { useRouter } from "next/router";
import { Edit, LogIn, Moon, Sun, X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import Button from "./Button";
import { BigTitle } from "./Title";
import {
  setEditMode,
  setUserId,
  StoreState,
  Themes,
  toggleTheme,
} from "../store/store";
import React, { useState } from "react";
import Avatar from "./Avatar";
import { LoginDropdown } from "./LoginDropdown";
import { AccountDropdown } from "./AccountDropdown";

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

const LoginButton = styled(Button)`
  height: 45px;
  border-color: ${({ theme }) => theme.loginButton.border};
  &:hover {
    border-color: ${({ theme }) => theme.loginButton.border};
    background: ${({ theme }) => theme.loginButton.hover.background};
  }
  & > svg,
  & .avatar {
    margin-right: 10px;
  }
  @media screen and (max-width: 720px) {
    font-size: 0;
    & > svg,
    & .avatar {
      margin-right: 0px;
    }
  }
`;

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const config = useSelector((state: StoreState) => state.config);
  const theme = useTheme();

  // Dropdown configuration
  const [dropdown, setDropdown] = useState<null | {
    x: number;
    y: number;
    kind: "login" | "account";
  }>(null);

  const isNotHome = router.pathname !== "/";

  function goBack() {
    if (isNotHome) {
      router.back();
    }
  }

  function themeOnClick() {
    dispatch(toggleTheme());
  }

  function toggleEditMode() {
    dispatch(setEditMode(!config.editMode));
  }

  function logOut() {
    dispatch(setUserId(null));
  }

  function logIn(userId: string) {
    dispatch(setUserId(userId));
    closeDropdown();
  }

  function showDropdown(
    e: React.MouseEvent<HTMLButtonElement>,
    kind: "login" | "account"
  ) {
    const data = e.currentTarget.getBoundingClientRect();
    setDropdown({
      x: data.x - 70,
      y: data.y + e.currentTarget.clientHeight + 5,
      kind,
    });
  }

  function closeDropdown() {
    setDropdown(null);
  }

  return (
    <NavbarContainer>
      <BigTitle onClick={goBack}>Posts</BigTitle>
      <ButtonsList>
        {config.userId ? (
          <LoginButton
            expanded={true}
            onClick={(e) => showDropdown(e, "account")}
          >
            <Avatar className="avatar">{config.userId.charAt(0)}</Avatar>
            {config.userId}
          </LoginButton>
        ) : (
          <LoginButton
            expanded={false}
            onClick={(e) => showDropdown(e, "login")}
          >
            <LogIn color={theme.icon.color} />
            Login
          </LoginButton>
        )}
        <Button expanded={false} onClick={themeOnClick}>
          {config.theme === Themes.Dark ? (
            <Sun color={theme.icon.color} />
          ) : (
            <Moon color={theme.icon.color} />
          )}
        </Button>
        <Button expanded={false} onClick={toggleEditMode}>
          {config.editMode ? (
            <X color={theme.icon.color} />
          ) : (
            <Edit color={theme.icon.color} />
          )}
        </Button>
      </ButtonsList>
      {dropdown ? (
        dropdown.kind === "login" ? (
          <LoginDropdown {...dropdown} close={closeDropdown} logIn={logIn} />
        ) : (
          <AccountDropdown
            {...dropdown}
            close={closeDropdown}
            logOut={logOut}
          />
        )
      ) : null}
    </NavbarContainer>
  );
}
