import React from "react";
import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";
import KButtonOrange from "../components/KButtonOrange";
import { useGoogleLogin } from "react-google-login";
import useLogin from "../hooks/useLogin";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export const GOOGLE_CLIENT_ID =
  "415303719139-sea932dqp0dii9q5r6bqc35g1s5uos11.apps.googleusercontent.com";

export default function LoginBox({ visible, onClose }) {
  if (!visible) return null;
  const { doLogin, loading: loginLoading } = useLogin();

  const { signIn, loaded } = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
    onSuccess: async (data) => {
      const token = data.tokenId;
      await doLogin(token);
      onClose();
    },
    onFailure: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <LoginBoxOverlayWrapper onClick={onClose} />
      <LoginBoxWrapper>
        <div className="login-box fade__in__animation">
          <header>
            <img src="login.svg" alt="" />
            <h1 className="title">Login to Ghumdim</h1>
          </header>
          <div className="cta-button">
            <KButtonOrange onClick={signIn} className="cta-google-btn">
              {!loginLoading && loaded && (
                <>
                  <FaGoogle />
                  <span>Login with google</span>
                </>
              )}
              {(loginLoading || !loaded) && (
                <AiOutlineLoading3Quarters className="rotate" />
              )}
            </KButtonOrange>
          </div>
        </div>
      </LoginBoxWrapper>
    </>
  );
}

const LoginBoxOverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 990;
  background: rgba(0, 0, 0, 0.5);
  cursor: default;
`;

const LoginBoxWrapper = styled.div`
  position: relative;
  z-index: 991;
  .login-box {
    width: 300px;
    box-shadow: var(--shadow-figma);
    padding: 24px;
    border: 0.5px solid #ddd;
    background: #fff;
    border-radius: var(--br);
    position: absolute;
    top: -10px;
    right: 0;

    header {
      text-align: center;
      img {
        width: 80px;
        margin-bottom: 10px;
      }
    }
    .title {
      font-size: 16px;
    }

    .cta-button {
      text-align: center;
      padding-top: 10px;
    }
    .cta-google-btn {
      font-size: 12px;
      box-shadow: var(--shadow-figma);

      span {
        margin-left: 8px;
      }
    }
  }
`;
