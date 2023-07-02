/* eslint-disable react/prop-types */
import styled from "styled-components";
import ImageIcon from "@mui/icons-material/Image";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../store";
import { Button, Modal } from "antd";

const PostModal = ({
  showPostModal,
  setShowPostModal,
  description,
  setDescription,
  isEdit,
  setIsEdit,
  currentEditPost,
}) => {
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
  const createNewPost = () => {
    dispatch(
      createPost({
        payload: {
          image: image,
          video: videoLink,
          user: currentUser,
          description: description,
        },
        onSuccess: () => {
          setShowPostModal(false);

          setDescription("");
          setIsEdit(false);
        },
      })
    );
  };
  const updatePostFunc = () => {
    dispatch(
      updatePost({
        postId: currentEditPost?.id,
        description,
        onSuccess: () => {
          setShowPostModal(false);
        },
      })
    );
  };
  return (
    <>
      <Modal
        title={isEdit ? "Edit a post" : "Create a post"}
        centered
        open={showPostModal}
        onOk={() => {
          setDescription("");
          setImage("");
          setVideoLink("");
          setAssetArea("");
          setShowPostModal(false);
        }}
        onCancel={() => {
          setDescription("");
          setImage("");
          setVideoLink("");
          setAssetArea("");
          setShowPostModal(false);
        }}
        footer={null}
      >
        {!isEdit && (
          <UserInfo>
            <img src={currentUser?.[0]?.avatar} alt="" />
            <span>{currentUser?.[0]?.name}</span>
          </UserInfo>
        )}

        <PostModalBody>
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
                  {videoLink && <ReactPlayer width={"100%"} url={videoLink} />}
                </>
              )
            )}
          </Editor>
          {!isEdit && (
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <ImageIcon />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <YouTubeIcon />
                </AssetButton>
              </AttachAssets>
              <Button
                onClick={isEdit ? updatePostFunc : createNewPost}
                key="submit"
                type="primary"
                disabled={description.length > 0 ? false : true}
                style={{ marginRight: "-24px" }}
              >
                {isEdit ? "Update" : "Post"}
              </Button>
            </ShareCreation>
          )}
        </PostModalBody>
      </Modal>
    </>
  );
};
const PostModalBody = styled.div`
  .modal-input {
    border: none !important;
    background-color: white;
    outline: none;
    color: black;
    font-size: 16px;
    font-family: system-ui;
    width: 100%;
    resize: none;
  }

  .ql-container.ql-snow,
  .ql-toolbar.ql-snow {
    border: none !important;
  }

  .ql-container.ql-snow {
    font-size: 20px;
    font-family: system-ui;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  padding-left: 0px;
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
  padding: 12px 24px 12px 0px;
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

const Editor = styled.div`
  padding: 12px 24px;
  padding-left: 0px;
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
