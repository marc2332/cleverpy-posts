import Button from "./Button";
import React, { useState } from "react";
import Dropdown, { DropdownOptions } from "./Dropdown";
import Input, { InputLabel } from "./Input";

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

  return (
    <Dropdown x={x} y={y} close={close}>
      <InputLabel>User</InputLabel>
      <Input placeholder="UserID" onChange={onUserIdChanged}></Input>
      <InputLabel>Password</InputLabel>
      <Input placeholder="Password"></Input>
      <Button expanded={true} onClick={logInOnClick}>
        Log in
      </Button>
    </Dropdown>
  );
}
