/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FileUploadModal, Header, Post, ProfileEdit } from "../../components";
import { HiOutlinePencil } from "react-icons/hi";
import {
  getAllPostsForSingleUser,
  getCurrentProfileForSingleUser,
  getPosts,
  setGeneralFields,
  uploadProfileImage,
} from "../../store";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  let location = useLocation();

  const currentUser = useSelector(({ generalSlice }) => generalSlice.user);
  const currentProfile = useSelector(
    ({ generalSlice }) => generalSlice.currentProfile
  );
  console.log("currentProfile", currentProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
    return () => {
      dispatch(setGeneralFields({ currentProfile: [] }));
    };
  }, []);
  useEffect(() => {
    if (location?.state?.id) {
      dispatch(getAllPostsForSingleUser({ id: location?.state?.id }));
    }

    if (location?.state?.email) {
      dispatch(
        getCurrentProfileForSingleUser({ email: location?.state?.email })
      );
    }
  }, []);
  const posts = useSelector(({ generalSlice }) => generalSlice.posts);

  const getImage = (e) => {
    setCurrentImage(e.target.files[0]);
  };

  const uploadImage = () => {
    dispatch(
      uploadProfileImage({
        currentImage,
        currentUserId: currentProfile?.[0]?.userID || currentUser?.[0]?.userID,
        setModalOpen,
        setProgress,
        setCurrentImage,
      })
    );
  };
  return (
    <ProfileWrapper>
      <Header />
      {isEdit ? (
        <ProfileEdit setIsEdit={setIsEdit} />
      ) : (
        <>
          <FileUploadModal
            getImage={getImage}
            uploadImage={uploadImage}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            currentImage={currentImage}
            progress={progress}
          />
          <ProfileCard>
            <EditIconWrapper>
              <HiOutlinePencil
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
              />
            </EditIconWrapper>
            <ProfileInfoWrapper>
              <div
                style={{
                  display: "flex",
                  gap: "0.8rem",
                  marginBottom: "0.8rem",
                  flexDirection: "column",
                }}
              >
                <ProfileImage
                  onClick={() => setModalOpen(true)}
                  src={
                    currentProfile?.length === 0
                      ? currentUser?.[0]?.avatar
                      : currentProfile?.[0]?.avatar
                  }
                  alt="profile-image"
                />
                <DisplayName>
                  {currentProfile?.length === 0
                    ? currentUser?.[0]?.name
                    : currentProfile?.[0]?.name}
                </DisplayName>
                {currentUser?.[0]?.headline ||
                  (currentProfile?.[0]?.headline ? (
                    <Headline>
                      {currentProfile?.length === 0
                        ? currentUser?.[0]?.headline
                        : currentProfile?.[0]?.headline}
                    </Headline>
                  ) : (
                    <></>
                  ))}

                {(currentUser?.[0]?.city && currentUser?.[0]?.country) ||
                (currentProfile?.[0]?.city && currentProfile?.[0]?.country) ? (
                  <p>
                    {currentProfile?.length === 0
                      ? `${currentUser?.[0]?.city}, ${currentUser?.[0]?.country}`
                      : `${currentProfile?.[0]?.city}, ${currentProfile?.[0]?.country}`}
                  </p>
                ) : (
                  <></>
                )}

                {currentUser?.[0]?.website || currentProfile?.[0]?.website ? (
                  <Website
                    target="_blank"
                    href={
                      currentProfile?.length === 0
                        ? `${currentUser?.[0]?.website}`
                        : currentProfile?.[0]?.website
                    }
                  >
                    {currentProfile?.length === 0
                      ? `${currentUser?.[0]?.website}`
                      : currentProfile?.[0]?.website}
                  </Website>
                ) : (
                  <></>
                )}
              </div>
              <RightInfo>
                <p>{currentUser?.[0]?.company}</p>
                <p>{currentUser?.[0]?.college}</p>
              </RightInfo>
            </ProfileInfoWrapper>
            <p>
              {currentProfile?.length === 0
                ? currentUser?.[0]?.aboutMe
                : currentProfile?.[0]?.aboutMe}
            </p>
            {currentUser?.[0]?.skills || currentProfile?.[0]?.skills ? (
              <p style={{ marginTop: "0.8rem" }}>
                <span className="skill-label" style={{ fontWeight: "600" }}>
                  Skills
                </span>
                :&nbsp;
                {currentProfile.length === 0
                  ? currentUser?.[0]?.skills
                  : currentProfile?.[0]?.skills}
              </p>
            ) : (
              <></>
            )}
          </ProfileCard>
          <ContainerWithPosts>
            {posts?.length === 0 ? (
              <p style={{ textAlign: "center" }}>
                There are no posts in your profile
              </p>
            ) : (
              <>
                {posts
                  ?.filter((item) => {
                    return (
                      item?.author?.email ===
                      localStorage.getItem("currentUserEmail")
                    );
                  })
                  ?.map((post, index) => (
                    <Post key={index} post={post} />
                  ))}
              </>
            )}
          </ContainerWithPosts>
        </>
      )}
    </ProfileWrapper>
  );
};

const ContainerWithPosts = styled.div`
  grid-area: main;
  margin: 5rem 3rem 3rem 5rem;
`;
const ProfileWrapper = styled.div``;
const ProfileCard = styled.div`
  background-color: white;
  height: auto;
  width: auto;
  margin: 5rem 3rem 3rem 5rem;
  border-radius: 0.5rem;
  padding: 20px;
  position: relative;
`;
const DisplayName = styled.h3`
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
  font-size: 24px;
  margin-top: 10px;
`;
const Website = styled.a`
  color: #004c75 !important;
  -webkit-link: #004c75;
  text-decoration: none;
`;
const Headline = styled.p`
  margin-top: 25px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.9);
  width: 320px;
  line-height: 20px;
`;
const EditIconWrapper = styled.div`
  position: absolute;
  right: 20px;
  svg {
    cursor: pointer;
    padding: 10px;
    &:hover {
      background-color: rgb(197, 197, 197);
      padding: 10px;
      border-radius: 50%;
    }
  }
`;
const ProfileInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RightInfo = styled.div`
  margin-top: 40px;
  margin-right: 30px;
  p {
    color: rgba(0, 0, 0, 0.9);
    font-size: 14px;
    font-weight: 600;
    line-height: 30px;
    margin-bottom: 5px;
  }
`;
const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 50%;
  border: 2px solid #cacaca;
  padding: 5px;
  cursor: pointer;
`;
export default Profile;
