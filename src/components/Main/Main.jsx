/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPosts } from "../../store";
import Post from "../Post";
import PostModal from "../PostModal";
import ShareBox from "../ShareBox";

const Main = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [descriptionForNewPost, setDescriptionForNewPost] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [currentEditPost, setCurrentEditPost] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  const posts = useSelector(({ postsSlice }) => postsSlice.posts);
  console.log(posts);
  const getEditData = (post) => {
    setShowPostModal(true);
    setDescriptionForNewPost(post?.description);
    setCurrentEditPost(post);
    setIsEdit(true);
  };
  return (
    <Container>
      <ShareBox setShowPostModal={setShowPostModal} setIsEdit={setIsEdit} />
      {posts?.length === 0 ? (
        <p style={{ textAlign: "center" }}>There are no posts</p>
      ) : (
        <>
          {posts?.map((post, index) => (
            <Post
              key={index}
              post={post}
              setShowPostModal={setShowPostModal}
              getEditData={getEditData}
            />
          ))}
        </>
      )}
      <PostModal
        showPostModal={showPostModal}
        setShowPostModal={setShowPostModal}
        description={descriptionForNewPost}
        setDescription={setDescriptionForNewPost}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        currentEditPost={currentEditPost}
      />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

export default Main;
