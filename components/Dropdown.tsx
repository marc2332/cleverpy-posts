import { PropsWithChildren, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const DropdownAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateY(-3px) scale(0.97);
    }
    to {
        opacity: 1;
        transform: translateY(0px) scale(1);
    }
`;

const DropdownContainer = styled.div<{ x: number; y: number }>`
  animation: ${DropdownAnimation} ease-out 0.2s;
  position: fixed;
  display: grid;
  grid-template-columns: auto;
  gap: 5px;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  padding: 15px;
  background: ${({ theme }) => theme.dropdown.background};
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.dropdown.border};
  width: 200px;
  z-index: 500;
  box-shadow: 0px 5px 30px 15px rgba(0, 0, 0, 0.1);
  & > * {
    margin: 3px 0px;
  }
  & > button {
    max-height: 35px;
  }
  @media screen and (max-width: 720px) {
    padding: 20px;
    left: 10%;
    top: 25%;
    width: 80%;
    & > button {
      margin: 5px 0px;
    }
  }
`;

const DropdownFullScreenBackground = styled.div`
  background: rgb(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 400;
`;

export interface DropdownOptions {
  x: number;
  y: number;
  close: () => void;
}

export default function Dropdown({
  x,
  y,
  children,
  close,
}: PropsWithChildren<DropdownOptions>) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in document.documentElement;

    const outsideClickListener = (ev: MouseEvent) => {
      if (ref.current && ev.target) {
        if (!ref.current.contains(ev.target as HTMLElement)) {
          close();
        }
      }
    };

    const resizeListener = () => {
      // Touchable devices will show the it's built-in keyboard causing the window to resize
      // No need to close the dropdown if that's the case
      if (!isTouchDevice) {
        close();
      }
    };

    const scrollListener = () => {
      close();
    };

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", resizeListener);
    window.addEventListener("mouseup", outsideClickListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", resizeListener);
      window.removeEventListener("mouseup", outsideClickListener);
    };
  }, [close]);

  const isSmallScreen = window.innerWidth <= 720;

  return (
    <>
      <DropdownContainer x={x} y={y} ref={ref}>
        {children}
      </DropdownContainer>
      {isSmallScreen && <DropdownFullScreenBackground />}
    </>
  );
}
