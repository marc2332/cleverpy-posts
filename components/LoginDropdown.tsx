import Button from "./Button";
import React, { useState } from "react";
import Dropdown, { DropdownOptions } from "./Dropdown";
import Input from "./Input";
import Label from "./Label";
import styled from "styled-components";

const CenteredLabel = styled.p`
  text-align: center;
  font-size: 14px;
`;

interface LoginDropdownOptions extends DropdownOptions {
  logIn: (userId: string) => void;
}

export function LoginDropdown({ x, y, close, logIn }: LoginDropdownOptions) {
  // User login info
  const [loginUserId, setLoginUserId] = useState<null | string>(null);

  function onUserIdChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginUserId(e.target.value);
  }

  function logInOnClick() {
    if (loginUserId) {
      logIn(loginUserId);
    }
  }

  function signUpOnClick() {
    alert(
      "No need! You can just log with any user or password, it's all fake."
    );
  }

  return (
    <Dropdown x={x} y={y} close={close}>
      <Label>User</Label>
      <Input placeholder="UserID" onChange={onUserIdChanged}></Input>
      <Label>Password</Label>
      <Input placeholder="Password"></Input>
      <Button expanded={true} onClick={logInOnClick}>
        Log in
      </Button>
      <CenteredLabel>No account yet? Join!</CenteredLabel>
      <Button expanded={true} onClick={signUpOnClick}>
        Sign up
      </Button>
    </Dropdown>
  );
}
