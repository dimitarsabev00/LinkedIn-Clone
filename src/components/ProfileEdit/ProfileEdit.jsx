/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Header } from "../../components";
import { AiOutlineClose } from "react-icons/ai";
import { editProfile } from "../../store";

const ProfileEdit = ({ setIsEdit }) => {
  const currentUser = useSelector(({ generalSlice }) => generalSlice.user);
  const [editInputs, setEditInputs] = useState(currentUser?.[0]);
  console.log("editInputs", editInputs);
  const dispatch = useDispatch();
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };
  const updateProfileData = async () => {
    dispatch(
      editProfile({
        payload: { ...editInputs },
        userID: currentUser?.[0]?.userID,
        onSuccess: () => {
          setIsEdit((prev) => !prev);
        },
      })
    );
  };
  return (
    <ProfileEditWrapper>
      <Header />

      <CloseEditIconWrapper>
        <AiOutlineClose
          onClick={() => {
            setIsEdit((prev) => !prev);
          }}
          size={25}
          style={{ cursor: "pointer" }}
        />
      </CloseEditIconWrapper>

      <ProfileEditInputsWrapper>
        <label>Name</label>
        <CommonInput
          onChange={getInput}
          placeholder="Name"
          name="name"
          value={editInputs?.name}
        />
        <label>Headline</label>
        <CommonInput
          onChange={getInput}
          placeholder="Headline"
          value={editInputs?.headline}
          name="headline"
        />
        <label>Country</label>
        <CommonInput
          onChange={getInput}
          placeholder="Country"
          name="country"
          value={editInputs?.country}
        />
        <label>City</label>
        <CommonInput
          onChange={getInput}
          placeholder="City"
          name="city"
          value={editInputs?.city}
        />
        <label>Company</label>
        <CommonInput
          onChange={getInput}
          placeholder="Company"
          value={editInputs?.company}
          name="company"
        />
        <label>Industry </label>
        <CommonInput
          onChange={getInput}
          placeholder="Industry"
          name="industry"
          value={editInputs?.industry}
        />
        <label>College</label>
        <CommonInput
          onChange={getInput}
          placeholder="College"
          name="college"
          value={editInputs?.college}
        />
        <label>Website</label>
        <CommonInput
          onChange={getInput}
          placeholder="Website"
          name="website"
          value={editInputs?.website}
        />
        <label>About</label>
        <CommonTextArea
          placeholder="About Me"
          onChange={getInput}
          cols={5}
          name="aboutMe"
          value={editInputs?.aboutMe}
        />
        <label>Skills</label>
        <CommonInput
          onChange={getInput}
          placeholder="Skill"
          name="skills"
          value={editInputs?.skills}
        />
      </ProfileEditInputsWrapper>
      <SaveButtonWrapper>
        <button onClick={updateProfileData}>Save</button>
      </SaveButtonWrapper>
    </ProfileEditWrapper>
  );
};
const ProfileEditWrapper = styled.div`
  background-color: white;
  height: auto;
  width: auto;
  margin: 5rem 3rem 3rem 5rem;
  border-radius: 0.5rem;
  padding: 20px;
  position: relative;
`;
const CloseEditIconWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`;
const ProfileEditInputsWrapper = styled.div`
  display: grid;
  margin-top: 40px;
  gap: 20px;
  label {
    margin-bottom: -15px;
  }
`;
const CommonInput = styled.input`
  height: 20px;
  padding: 10px;
  background-color: white;
  outline: none;
  border: 1px solid #212121;
  color: #212121;
  border-radius: 3px;
  font-size: 16px;
`;
const CommonTextArea = styled.input`
  padding: 10px;
  background-color: white;
  outline: none;
  border: 1px solid #212121;
  color: #212121;
  border-radius: 3px;
  font-size: 16px;
  margin: 10px 0px;
`;
const SaveButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    width: 300px;
    height: 50px;
    cursor: pointer;
    background-color: #0073b1;
    border-radius: 30px;
    outline: none;
    border: none;
    font-weight: 600;
    color: #ffffff;
    font-size: 18px;
    margin-top: 20px;
  }
`;
export default ProfileEdit;
