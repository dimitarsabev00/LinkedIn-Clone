/* eslint-disable react/prop-types */
import styled from "styled-components";
// import UserDefaultAvatar from "../../assets/icons/user-default-avatar.svg";
import ThreeDotsIcon from "@mui/icons-material/MoreHoriz";
import LikeIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import LikeReactionIcon from "@mui/icons-material/Recommend";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
const Post = ({ post }) => {
  const navigate = useNavigate();
  return (
    <PostWrapper>
      <AuthorDetails>
        <a href="">
          <img src={post?.author?.avatar} alt="" />
          <div>
            <span
              onClick={() =>
                navigate("/profile", {
                  state: {
                    id: post?.author?.id,
                    email: post?.author?.email,
                  },
                })
              }
            >
              {post?.author?.fullName}
            </span>
            <span>{post?.author?.createdAt}</span>
          </div>
        </a>
        <button>
          <ThreeDotsIcon />
        </button>
      </AuthorDetails>
      <Description>{post?.description}</Description>
      <Image>
        {post?.video ? (
          <ReactPlayer width={"100%"} url={post?.video} />
        ) : (
          <>{post?.sharedImage && <img src={post?.sharedImage} alt="" />}</>
        )}
      </Image>
      <PostDetails>
        <li>
          <button>
            <LikeReactionIcon />
            <span>75</span>
          </button>
        </li>
        <li>
          <p>2 comments</p>
        </li>
      </PostDetails>
      <PostActions>
        <button>
          <LikeIcon />
          <span>Like</span>
        </button>
        <button>
          <CommentIcon />
          <span>Comments</span>
        </button>
        <button>
          <ShareIcon />
          <span>Share</span>
        </button>
        <button>
          <SendIcon />
          <span>Send</span>
        </button>
      </PostActions>
    </PostWrapper>
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
const PostWrapper = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const AuthorDetails = styled.div`
padding-right: 40px;
flex-wrap:nowrap;
padding:12px 16px  0;
margin-bottom:8px;
align-items:center;
display:flex;
a {
  margin-right:12px
  flex-grow:1;
  overflow:hidden;
  display:flex;
  text-decoration:none;
  img {
width:48px;
height:48px;
border-radius:50%;
  }
  & > div {
    display:flex;
    flex-direction:column;
    flex-grow:1;
    flex-basis:0;
    margin-left:8px;
    overflow:hidden;
    span {
      text-align:left;
      &:first-child {
        font-size:14px;
        font-weight:700;
        color:rgba(0,0,0,1);
      }
      &:nth-child(n+1){
        font-size:12px;
        color:rgba(0,0,0,0.6)
      }
    }
  }
}
button {
  position: absolute; 
right:12px;
top:0;
background:transparent;
border:none;
outline:none;
}
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const Image = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const PostDetails = styled.ul`
  line-height: 1.3;
  display: flex;
  justify-content: space-between;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      background-color: white;
      gap: 0.3rem;
      align-items: center;
      &:first-child {
        color: #0a66c2;
      }
      span {
        color: black;
      }
    }
  }
`;
const PostActions = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    border: none;
    background-color: white;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
export default Post;
