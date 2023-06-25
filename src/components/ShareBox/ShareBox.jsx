import styled from "styled-components";
import UserDefaultAvatar from "../../assets/icons/user-default-avatar.svg";
import AddImageIcon from "@mui/icons-material/Image";
import AddVideoIcon from "@mui/icons-material/VideoLibrary";
import AddEventIcon from "@mui/icons-material/EventNote";
import AddArticleIcon from "@mui/icons-material/Notes";
import { useSelector } from "react-redux";
import { useState } from "react";
import PostModal from "../PostModal";
const ShareBox = () => {
  const currentUser = useSelector(({ generalSlice }) => generalSlice.user);
  const [showModal, setShowModal] = useState("close");
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;

      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
      <ShareBoxWrapper>
        <div>
          <img src={currentUser?.[0]?.avatar || UserDefaultAvatar} alt="" />
          <button onClick={handleClick}>Start a post</button>
        </div>
        {/* <div>
          <button>
            <AddImageIcon style={{ color: "#7CBBF3" }} />
            <span>Photo</span>
          </button>
          <button>
            <AddVideoIcon style={{ color: "#8AC464" }} />
            <span>Video</span>
          </button>
          <button>
            <AddEventIcon style={{ color: "#EBA93E" }} />
            <span>Event</span>
          </button>
          <button>
            <AddArticleIcon style={{ color: "#F89F88" }} />
            <span>Write Article</span>
          </button>
        </div> */}
      </ShareBoxWrapper>
      <PostModal showModal={showModal} handleClick={handleClick} />
    </>
  );
};
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const ShareBoxWrapper = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 16px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      gap: 0.3rem;
    }
    &:first-child {
      display: flex;
      align-items: center;
      margin: 0.8rem 1.6rem 0.8rem;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

export default ShareBox;
