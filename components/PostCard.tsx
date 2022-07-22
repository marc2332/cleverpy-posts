import Link from "next/link";
import styled from "styled-components";
import Post from "../types/posts";

const Card = styled.div`
  background: white;
  color: black;
  width: 300px;
  height: 160px;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 20px;
  transition: 0.1s;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  &:hover {
    box-shadow: 0px 4px 15px rgba(0,0,0,0.2);
    border: 1px solid rgb(220, 220, 220);
  }
`;

const CardTitle = styled.h4`
  color: rgb(50, 50, 50);
  margin: 0px;
`;

const CardBody = styled.p`
  color: rgb(50, 50, 50);
  margin: 0px;
  overflow: hidden;
  white-space: nowrap; 
  text-overflow: ellipsis;
`;

const CardAuthor = styled.p`
  position: absolute;
  color: rgb(80, 80, 80);
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
