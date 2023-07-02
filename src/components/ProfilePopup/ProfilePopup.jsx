/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { logout } from "../../store";

const ProfilePopup = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const currentUser = useSelector(({ generalSlice }) => generalSlice.user);

  return (
    <ProfilePopUpWrapper>
      <DisplayName>{currentUser?.[0]?.name}</DisplayName>
      <Headline>{currentUser?.[0]?.headline}</Headline>
      <button
        onClick={() => {
          navigate("/profile", {
            state: {
              id: currentUser?.[0]?.userID,
            },
          });
        }}
      >
        View Profile
      </button>
      <button
        onClick={() => {
          dispatch(
            logout({
              onSuccess: () => {
                toast.success("Success Logout!");
              },
            })
          );
        }}
      >
        Logout
      </button>
    </ProfilePopUpWrapper>
  );
};
const ProfilePopUpWrapper = styled.div`
  border: 1px solid #a8a8a8;
  width: 200px;
  height: auto;
  background-color: whitesmoke;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  button {
    width: 200px;
    height: 30px;
    cursor: pointer;
    background-color: whitesmoke;
    border: 2px solid #003365;
    color: #014488;
    border-radius: 30px;
    font-weight: 600;
    font-size: 14px;
    margin: 7px 0;
    &:hover {
      background-color: rgb(230, 230, 230);
      border: 2px solid #014488;
      color: #014488;
    }
  }
`;
const DisplayName = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
  text-align: left;
  margin-top: -7px;
`;
const Headline = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.9);
  margin-top: 15px;
`;
export default ProfilePopup;
