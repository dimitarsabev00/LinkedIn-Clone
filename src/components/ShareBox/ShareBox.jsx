/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useSelector } from "react-redux";
const ShareBox = ({ setShowPostModal, setIsEdit }) => {
  const currentUser = useSelector(({ generalSlice }) => generalSlice.user);

  return (
    <>
      <ShareBoxWrapper>
        <div>
          <img src={currentUser?.[0]?.avatar} alt="" />
          <button
            onClick={() => {
              setShowPostModal(true);
              setIsEdit(false);
            }}
          >
            Start a post
          </button>
        </div>
      </ShareBoxWrapper>
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
