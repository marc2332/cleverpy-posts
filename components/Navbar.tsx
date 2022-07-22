import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { Moon } from "react-feather";
import styled from "styled-components";
import Button from "./Button";
import { BigTitle } from "./Title";

const NavbarContainer = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ButtonsList = styled.div`
    display: flex;
    align-items: center;
    & > button {
        display: inline-block;
    }
`;

export default function Navbar({ children }: PropsWithChildren) {
  const router = useRouter();

  function toggleTheme() {
  }

  return (
    <NavbarContainer>
      <BigTitle onClick={router.back}>Posts</BigTitle>
      <ButtonsList>
        <Button onClick={toggleTheme}>
          <Moon />
        </Button>
      </ButtonsList>
    </NavbarContainer>
  );
}
