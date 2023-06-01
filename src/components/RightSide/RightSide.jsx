import styled from "styled-components";
import FeedInfoIcon from "../../assets/icons/feed-info-icon.svg";
import UserDefaultAvatar from "../../assets/icons/user-default-avatar.svg";
import ArrowRightIcon from "../../assets/icons/arrow-right-icon.svg";

const RightSide = () => {
  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>Add to your feed</h2>
          <img src={FeedInfoIcon} alt="" />
        </Title>

        <FeedList>
          <li>
            <a>
              <Avatar
                style={{
                  backgroundImage: `url(${UserDefaultAvatar})`,
                }}
              />
            </a>
            <div>
              <span>Gabriela K.</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
              <Avatar
                style={{
                  backgroundImage: `url(${UserDefaultAvatar})`,
                }}
              />
            </a>
            <div>
              <span>Nikol D.</span>
              <button>Follow</button>
            </div>
          </li>
        </FeedList>

        <Recommendation>
          <p>View all recommendations</p>
          <img src={ArrowRightIcon} alt="" />
        </Recommendation>
      </FollowCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
`;

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
`;

const FeedList = styled.ul`
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
    }
  }
`;

const Avatar = styled.div`
  /* background-image: url(""); */
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  margin-right: 8px;
  border-radius: 50%;
`;

const Recommendation = styled.a`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 0.3rem;
`;

export default RightSide;
