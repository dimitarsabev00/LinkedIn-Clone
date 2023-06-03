import styled from "styled-components";
import Post from "../Post";
import ShareBox from "../ShareBox";

const Main = () => {
  return (
    <Container>
      <ShareBox />
      <Post />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

export default Main;
