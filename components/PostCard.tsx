import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled, { css, keyframes } from "styled-components";
import Post from "../types/posts";
import Button from "./Button";

const CardBase = css`
  border: 1px solid ${(theme) => theme.theme.card.border};
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
  max-width: 300px;
  height: 160px;
  @media screen and (min-width: 720px) {
    &:nth-child(1) {
      max-width: 630px;
    }
  }
  @media screen and (max-width: 720px) {
    max-width: 320px;
  }
`;

const Card = styled.div`
  ${CardBase}
  background: ${(theme) => theme.theme.card.background};
  transition: box-shadow 0.1s, border 0.1s;
  cursor: pointer;
  position: relative;
  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid ${(theme) => theme.theme.card.hover.border};
    -webkit-tap-highlight-color: transparent;
  }
`;

const CardTitle = styled.h4`
  color: ${(theme) => theme.theme.card.title.color};
  margin: 0px;
`;

const CardBody = styled.p`
  color: ${(theme) => theme.theme.card.body.color};
  margin: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardAuthor = styled.p`
  position: absolute;
  color: ${(theme) => theme.theme.card.author.color};
  font-style: italic;
  bottom: 0px;
  right: 20px;
`;

interface CardOptions extends Post {
  floatingButton: React.ReactElement | null;
}

export default function PostCard({
  userId,
  id,
  title,
  body,
  floatingButton,
}: CardOptions) {
  return (
    <Link href={`/post/${id}`} scroll={false}>
      <Card title={title}>
        <CardTitle>{title.split(" ").slice(0, 7).join(" ")}</CardTitle>
        <CardBody>{body.split(" ").slice(0, 12).join(" ")}</CardBody>
        <CardAuthor>By {userId}</CardAuthor>
        {floatingButton}
      </Card>
    </Link>
  );
}

export const ScalingAnimation = keyframes`
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
`;

export const CardFloatingButton = styled(Button)`
  animation: ${ScalingAnimation} ease-out 0.1s;
  position: absolute;
  top: -15px;
  right: -15px;
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 50px;
  &:active {
    transform: scale(0.96);
  }
`;

export const PostCardWithShimmer = styled(Skeleton)`
  ${CardBase}
`;
