/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { BiSolidLike, BiLike } from "react-icons/bi";
import { BsPencil, BsTrash } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import LikeReactionIcon from "@mui/icons-material/Recommend";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addedCommentForSinglePost,
  deletePost,
  getAllUsers,
  getCommentsForSinglePost,
  getLikesByUser,
  likePost,
} from "../../store/slices/generalSlice";
import { useState } from "react";
import { useEffect } from "react";
const Post = ({ post, getEditData }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const currentUser = useSelector(({ generalSlice }) => generalSlice.user);
  const allUsers = useSelector(({ generalSlice }) => generalSlice.allUsers);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = currentUser?.[0]?.userID;
  const handleLike = () => {
    dispatch(
      likePost({
        userId,
        postId: post?.id,
        liked,
      })
    );
  };
  const addComment = () => {
    dispatch(
      addedCommentForSinglePost({
        postId: post?.id,
        comment,
        displayNameUser: currentUser?.[0]?.name,
      })
    );
    setComment("");
  };
  useEffect(() => {
    dispatch(
      getLikesByUser({ userId, postId: post?.id, setLiked, setLikesCount })
    );
    dispatch(getCommentsForSinglePost({ postId: post?.id, setComments }));
  }, [userId, post?.id]);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <PostWrapper>
      <AuthorDetails>
        <a href="">
          <img
            src={
              allUsers
                .filter((item) => item?.id === post?.author?.id)
                .map((item) => item?.avatar)[0]
            }
            alt=""
          />
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

        <div className="actions-container">
          <BsPencil
            size={20}
            style={{ color: "#474747", padding: "10px" }}
            className="action-icon"
            onClick={() => getEditData(post)}
          />

          <BsTrash
            size={20}
            className="action-icon"
            style={{ color: "#474747", padding: "10px" }}
            onClick={() => dispatch(deletePost({ postId: post?.id }))}
          />
        </div>
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
        {likesCount >= 1 && (
          <li>
            <button>
              <LikeReactionIcon />
              <span>{likesCount}</span>
            </button>
          </li>
        )}

        <li>
          <p>{`${comments?.length} comments`}</p>
        </li>
      </PostDetails>
      <PostActions>
        <button onClick={handleLike}>
          {liked ? (
            <BiSolidLike size={30} color={"#0a66c2"} />
          ) : (
            <BiLike size={30} />
          )}

          <span style={{ color: liked && "#0a66c2" }}>Like</span>
        </button>
        <button
          onClick={() => {
            setShowComments((prev) => !prev);
          }}
          style={{ color: showComments && "#0a66c2" }}
        >
          <AiOutlineComment size={30} />
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
      {showComments && (
        <div style={{ paddingBottom: "1rem" }}>
          <CommentInputWrapper>
            <div style={{ display: "flex" }}>
              <input
                placeholder="Add a comment..."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                value={comment}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={addComment}>Add comment</button>
            </div>
          </CommentInputWrapper>
          <div>
            {comments.length > 0 ? (
              comments.map(({ id, comment, createdAt, displayNameUser }) => {
                return (
                  <SingleComment key={id}>
                    <h6 className="name">{displayNameUser}</h6>
                    <p className="comment">{comment}</p>

                    <p className="createdAt">{createdAt}</p>
                    {/* 
                  <p>•</p>
                   */}
                  </SingleComment>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
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
.actions-container {
  position: absolute; 
right:10px;
background:transparent;
border:none;
outline:none;
.action-icon{
  color: #474747;
    padding: 10px;
    cursor:pointer;
    &:hover {
      color: #000000;
    background-color: #b7b7b7;
    padding: 10px;
    border-radius: 50%;
    }
}
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
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #676667;
    border: none;
    background-color: white;
    cursor: pointer;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
const CommentInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-top: 0;
  div {
    input {
      flex: 1;
      height: 40px;
      padding-left: 10px;
      border-radius: 30px;
      border: 1px solid #737373;
      color: #4b4b4b;
      font-size: 16px;
      outline: none;
    }
  }

  button {
    width: 150px;
    height: 35px;
    background-color: #0a66c2;
    color: white;
    outline: none;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;
const SingleComment = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid rgb(227, 227, 227);
  border-radius: 10px;
  position: relative;
  margin: 10px;
  align-items: flex-start;
  .name {
    color: #212121;
    text-decoration: none;
    margin-left: 10px;
    margin-top: 10px;
  }

  .comment {
    margin: 10px;
  }

  .createdAt {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;
export default Post;
