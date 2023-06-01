import styled from "styled-components";
import { Header, LeftSide, RightSide } from "../../components";

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <Layout>
          <LeftSide />
          <div>Main</div>
          <RightSide />
        </Layout>
      </Container>
    </>
  );
};
const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
export default Home;
