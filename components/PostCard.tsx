import Link from "next/link";
import styled from "styled-components";
import Post from "../types/posts";

const Card = styled.div`
  background: ${(theme) => theme.theme.card.background};
  color: black;
  max-width: 300px;
  height: 160px;
  border-radius: 10px;
  padding: 20px;
  transition: 0.1s;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  border: 1px solid ${(theme) => theme.theme.card.border};
  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid ${(theme) => theme.theme.card.hover.border};
    -webkit-tap-highlight-color: transparent;
  }
  @media screen and (max-width: 720px) {
    max-width: 400px;
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
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CardAuthor = styled.p`
  position: absolute;
  color: ${(theme) => theme.theme.card.author.color};
  font-style: italic;
  bottom: 0px;
  right: 20px;
`;

export default function PostCard({ userId, id, title, body }: Post) {
  return (
    <Link href={`/post/${id}`} scroll={false}>
      <Card>
        <CardTitle>{title}</CardTitle>
        <CardBody>{body.split(" ").slice(0, 7).join(" ")}</CardBody>
        <CardAuthor>{userId}</CardAuthor>
      </Card>
    </Link>
  );
}
