import { useRouter } from "next/router";
import { Edit, LogIn, LogOut, Moon, Sun, X } from "react-feather";
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
import Dropdown from "./Dropdown";
import Input, { InputLabel } from "./Input";
import Post from "../types/posts";
import Avatar from "./Avatar";

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
  & > svg {
    margin-right: 10px;
  }
  & .avatar {
    margin-left: 10px;
  }
  @media screen and (max-width: 720px) {
    font-size: 0;
    & > svg {
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
  const [loginDropdown, setLoginDropdown] = useState<null | {
    x: number;
    y: number;
  }>(null);

  // User login info
  const [loginUserId, setLoginUserId] = useState<null | string>(null);

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

  function logIn() {
    dispatch(setUserId(loginUserId));
    closeLoginDropdown();
  }

  function showLoginDropdown(e: React.MouseEvent<HTMLButtonElement>) {
    const data = e.currentTarget.getBoundingClientRect();
    setLoginDropdown({
      x: data.x - 70,
      y: data.y + e.currentTarget.clientHeight + 5,
    });
  }

  function closeLoginDropdown() {
    setLoginDropdown(null);
    setLoginUserId(null);
  }

  function onUserIdChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginUserId(e.target.value);
  }

  return (
    <NavbarContainer>
      <BigTitle onClick={goBack}>Posts</BigTitle>
      <ButtonsList>
        {config.userId ? (
          <LoginButton expanded={true} onClick={logOut}>
            <LogOut color={theme.icon.color} />
            Sign out
            <Avatar className="avatar">{config.userId.charAt(0)}</Avatar>
          </LoginButton>
        ) : (
          <LoginButton expanded={false} onClick={showLoginDropdown}>
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
      {loginDropdown && (
        <Dropdown {...loginDropdown} close={closeLoginDropdown}>
          <InputLabel>User</InputLabel>
          <Input placeholder="UserID" onChange={onUserIdChanged}></Input>
          <InputLabel>Password</InputLabel>
          <Input placeholder="Password"></Input>
          <Button expanded={true} onClick={logIn}>
            Continue
          </Button>
        </Dropdown>
      )}
    </NavbarContainer>
  );
}
