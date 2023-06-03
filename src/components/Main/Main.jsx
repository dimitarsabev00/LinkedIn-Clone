import styled from "styled-components";
import ShareBox from "../ShareBox";

const Main = () => {
  return (
    <Container>
      <ShareBox />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

export default Main;
