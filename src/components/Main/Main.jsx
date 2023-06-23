/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPosts } from "../../store/slices/generalSlice";
import Post from "../Post";
import ShareBox from "../ShareBox";

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  const posts = useSelector(({ generalSlice }) => generalSlice.posts);
  console.log("posts", posts);
  return (
    <Container>
      <ShareBox />
      {posts?.length === 0 ? (
        <p style={{ textAlign: "center" }}>There are no posts</p>
      ) : (
        <>
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

export default Main;
