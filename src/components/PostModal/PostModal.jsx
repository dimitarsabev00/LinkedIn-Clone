/* eslint-disable react/prop-types */
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import UserDefaultAvatar from "../../assets/icons/user-default-avatar.svg";
import ImageIcon from "@mui/icons-material/Image";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CommentIcon from "@mui/icons-material/Comment";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { createPost } from "../../store/slices/generalSlice";

const PostModal = ({ showModal, handleClick }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const currentUser = useSelector(({ generalSlice }) => generalSlice.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not a image, the file  is a ${typeof image}`);
      return;
    }
    setImage(image);
  };

  const switchAssetArea = (area) => {
    setImage("");
    setVideoLink("");
    setAssetArea(area);
  };
  const createPostInModal = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      createPost({
        payload: {
          image: image,
          video: videoLink,
          user: currentUser,
          description: description,
          timestamp: Timestamp.now(),
        },
      })
    );
    reset(e);
  };
  const reset = (e) => {
    setDescription("");
    setImage("");
    setVideoLink("");
    setAssetArea("");

    handleClick(e);
  };
  return (
    <>
      {showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <CloseIcon />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                <img
                  src={currentUser?.[0]?.avatar || UserDefaultAvatar}
                  alt=""
                />
                <span>{currentUser?.[0]?.name || "ex. Pesho Peshov"}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="What do you want to talk about?"
                  autoFocus
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image to share</label>
                    </p>
                    {image && <img src={URL.createObjectURL(image)} />}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <ImageIcon />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <YouTubeIcon />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <CommentIcon />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!description}
                onClick={(e) => {
                  createPostInModal(e);
                }}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    max-width: auto;
    color: rgba(0, 0, 0, 0.15);
    border: none;
    border-radius: 50%;
    background-color: #fefffe;
    &:hover {
      cursor: pointer;
    }
    svg,
    img {
      pointer-events: none;
    }
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;
const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  border: none;
  background: white;
  cursor: pointer;
`;
const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;
const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${({ disabled }) => (disabled ? "#EEECEF" : "#0a66c2")};
  color: ${({ disabled }) => (disabled ? "#C1BEC0" : "white")};
  border: none;
  font-weight: 700;
  &:hover {
    background: ${({ disabled }) => (disabled ? "#EEECEF" : "#004182")};
    cursor: ${({ disabled }) => !disabled && "pointer"};
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    border: none;
    outline: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

export default PostModal;
