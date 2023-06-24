/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginLogo from "../../assets/icons/login-logo.svg";
import styled from "styled-components";
import { loginUserWithEmailAndPassword } from "../../store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <LoginWrapper>
      <img src={LoginLogo} width={"80px"} />

      <InnerLoginWrapper>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Heading>Sign in</Heading>
          <SubHeading>Stay updated on your professional world</SubHeading>
        </div>

        <AuthInputs>
          <CommonInput
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email or Phone"
            value={email}
          />
          <CommonInput
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
          />
        </AuthInputs>
        <LoginButton
          onClick={() => {
            dispatch(
              loginUserWithEmailAndPassword({
                payload: {
                  email,
                  password,
                },
                onSuccess: () => {
                  navigate("/feed");
                  toast.success("Success Login!");
                },
              })
            );
          }}
        >
          Sign in
        </LoginButton>
      </InnerLoginWrapper>
      <HorizontalLineWithText data-content="or" />
      <GoogleButtonContainer>
        <p style={{ fontSize: "18px" }}>
          New to LinkedIn?{" "}
          <JoinNow onClick={() => navigate("/register")}>Join now</JoinNow>
        </p>
      </GoogleButtonContainer>
    </LoginWrapper>
  );
};
const LoginWrapper = styled.div`
  background-color: white;
  height: 100vh;
`;
const InnerLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Heading = styled.h1`
  font-size: 1.2rem;
  line-height: 1.25;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.9);
  padding: 0 0 4px 0;
`;
const SubHeading = styled.p`
  ont-size: 1.4rem;
  line-height: 1.42857;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 1rem;
`;
const LoginButton = styled.button`
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
  &:hover {
    background-color: #004c75;
  }
`;
const AuthInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;
const HorizontalLineWithText = styled.hr`
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: 0.5;
  &:before {
    content: "";
    // use the linear-gradient for the fading effect
    // use a solid background color for a solid bar
    background: linear-gradient(to right, transparent, #818078, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;

    padding: 0 0.5em;
    line-height: 1.5em;
    // this is really the only tricky part, you need to specify the background color of the container element...
    color: #818078;
    background-color: #fcfcfa;
  }
`;
const GoogleButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const JoinNow = styled.span`
  color: #0072b1;
  cursor: pointer;
  font-size: 18px;
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
export default Login;
