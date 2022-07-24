import Button, { ButtonWithIcon } from "./Button";
import React from "react";
import Dropdown, { DropdownOptions } from "./Dropdown";
import { useTheme } from "styled-components";
import { LogOut } from "react-feather";

interface AccountDropdownOptions extends DropdownOptions {
  logOut: () => void;
}

export function AccountDropdown({
  x,
  y,
  close,
  logOut,
}: AccountDropdownOptions) {
  const theme = useTheme();

  function logOutOnClick() {
    logOut();
    close();
  }

  return (
    <Dropdown x={x} y={y} close={close}>
      <ButtonWithIcon expanded={true} onClick={logOutOnClick}>
        <LogOut color={theme.icon.color} />
        Sign out
      </ButtonWithIcon>
    </Dropdown>
  );
}
