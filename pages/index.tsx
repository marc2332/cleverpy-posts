import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import CenteredLayout from "../components/CenteredLayout";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import PostsList from "../components/PostsList";
import fetchPosts from "../services/fetchPosts";
import { StoreState } from "../store/store";

export default function Home() {
  const posts = useSelector((state: StoreState) => state.posts);

  function scrollToTop() {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  return (
    <CenteredLayout>
      <main>
        <Navbar />
        <PostsList>
          {posts
            ? posts.length > 0
              ? posts.map((post) => <PostCard key={post.id} {...post} />)
              : "No posts :("
            : "Loading posts..."}
        </PostsList>
        <Button onClick={scrollToTop}>Scroll to top</Button>
      </main>
    </CenteredLayout>
  );
}
