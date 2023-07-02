import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ConnectedUsers, Header } from "../../components";
import { getAllUsers } from "../../store/slices/generalSlice";
const Connections = () => {
  const allUsers = useSelector(({ generalSlice }) => generalSlice.allUsers);
  const currentUser = useSelector(({ generalSlice }) => generalSlice.user);
  console.log("allUsers", allUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <>
      <Header />
      <Container>
        {allUsers.length > 1 ? (
          <ConnectionsWrapper>
            {allUsers.map((user) => {
              return user?.id === currentUser?.[0]?.userID ? (
                <></>
              ) : (
                <ConnectedUsers
                  key={user?.userID}
                  currentUserId={currentUser?.[0]?.userID}
                  user={user}
                />
              );
            })}
          </ConnectionsWrapper>
        ) : (
          <ConnectionsWrapper>No Connections to Add!</ConnectionsWrapper>
        )}
      </Container>
    </>
  );
};
const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

const ConnectionsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  margin: 30px;
  border: 1px solid #bbbbbb;
  background-color: white;
  border-radius: 10px;
`;
export default Connections;
