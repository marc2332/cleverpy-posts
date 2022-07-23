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
  height: 200px;
  z-index: 1;
  & > * {
    margin: 0px;
  }
  & > button {
    max-height: 35px;
  }
`;

interface DropdownOptions {
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
    const outsideClickListener = (ev: Event) => {
      if (ref.current && ev.target) {
        if (!ref.current.contains(ev.target as HTMLElement)) {
          close();
        }
      }
    };

    const resizeListener = () => {
      close();
    };

    window.addEventListener("resize", resizeListener);
    window.addEventListener("mouseup", outsideClickListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
      window.removeEventListener("mouseup", outsideClickListener);
    };
  }, []);

  return (
    <DropdownContainer x={x} y={y} ref={ref}>
      {children}
    </DropdownContainer>
  );
}
