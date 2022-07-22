import { title } from "process";
import Post from "../types/posts";

const API_URL = "https://jsonplaceholder.typicode.com/";
const API_POSTS_URL = API_URL + "posts";

function toUpperCaseFirstChar(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function fetchPosts(): Promise<Array<Post>> {
  return fetch(API_POSTS_URL)
    .then((res) => res.json())
    .then((res: Array<Post>) =>
      res.map((post) => {
        return {
          ...post,
          // Make the capital first character of the title and body
          title: toUpperCaseFirstChar(post.title),
          body: toUpperCaseFirstChar(post.body),
        };
      })
    );
}
