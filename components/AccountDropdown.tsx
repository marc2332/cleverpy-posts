import Button, { ButtonWithIcon } from "./Button";
import React from "react";
import Dropdown, { DropdownOptions } from "./Dropdown";
import { useTheme } from "styled-components";
import { LogOut, Star } from "react-feather";
import Link from "next/link";

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
      <Link href="/likedPosts">
        <ButtonWithIcon expanded={true}>
          <Star color={theme.icon.color} />
          Liked Posts
        </ButtonWithIcon>
      </Link>
      <ButtonWithIcon expanded={true} onClick={logOutOnClick}>
        <LogOut color={theme.icon.color} />
        Sign out
      </ButtonWithIcon>
      <Link href="https://github.com/marc2332/cleverpy-posts/issues">
        <Button expanded={true}>Report Bugs</Button>
      </Link>
    </Dropdown>
  );
}
