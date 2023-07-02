/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addConnection, getConnections } from "../../store";

const ConnectedUsers = ({ user, currentUserId }) => {
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      getConnections({
        userId: currentUserId,
        targetId: user?.id,
        setIsConnected,
      })
    );
  }, [currentUserId, user?.id]);
  const getCurrentUser = (id) => {
    dispatch(addConnection({ userId: currentUserId, targetId: id }));
  };
  return isConnected ? (
    <></>
  ) : (
    <ConnectedUsersWrapper>
      <img src={user?.avatar} />
      <p
        className="name"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: user?.id,
              email: user?.email,
            },
          })
        }
      >
        {user?.name}
      </p>
      <p className="headline">{user?.headline}</p>

      <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUsergroupAdd size={20} />
        Connect
      </button>
    </ConnectedUsersWrapper>
  );
};
const ConnectedUsersWrapper = styled.div`
  border: 1px solid #bbbbbb;
  width: 250px;
  height: 330px;
  margin: 10px;
  padding: 10px;
  display: flex;

  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  position: relative;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .name {
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }

  .headline {
    margin-top: 15px;
    font-size: 15px;
    font-weight: 400;
  }

  button {
    width: 90%;
    height: 40px;
    position: absolute;
    bottom: 10px;
    cursor: pointer;
    background-color: white;
    color: #0a65c3;
    border: 1px solid #0a65c3;
    font-size: 16px;
    font-family: system-ui;
    border-radius: 30px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;
export default ConnectedUsers;
