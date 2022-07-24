import Button from "./Button";
import React, { useState } from "react";
import Dropdown, { DropdownOptions } from "./Dropdown";
import Input from "./Input";
import Label from "./Label";

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
      <Label>User</Label>
      <Input placeholder="UserID" onChange={onUserIdChanged}></Input>
      <Label>Password</Label>
      <Input placeholder="Password"></Input>
      <Button expanded={true} onClick={logInOnClick}>
        Log in
      </Button>
    </Dropdown>
  );
}
