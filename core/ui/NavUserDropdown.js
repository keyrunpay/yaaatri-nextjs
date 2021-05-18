import { useRouter } from "next/router";
import React from "react";
import { FiBell, FiEdit, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import styled from "styled-components";
import useAuthInfo from "../hooks/useAuthInfo";
import useLogin from "../hooks/useLogin";

export default function NavUserDropdown({ visible, onClose }) {
  if (!visible) return null;
  const user = useAuthInfo();
  const { doLogout } = useLogin();
  const router = useRouter();

  const gotoMyStories = () => router.push("/my_stories");

  const gotoWriteStory = () => router.push("/write_story");

  const handleLinkItemClick = React.useCallback(
    (fn) => {
      onClose();
      fn();
    },
    [onClose]
  );

  return (
    <>
      <NavUserOverlayWrapper onClick={onClose} />
      <NavUserWrapper>
        <div className="nav-user-box fade__in__animation">
          <header>
            <img className="user-image" src={user?.image} alt="" />
            <h1 className="name">{user?.name}</h1>
            <p className="email">{user?.email}</p>
          </header>

          <div className="profile-dropdown-links">
            <div className="link-item">
              <FiUser />
              <span>Profile</span>
            </div>
            <div
              onClick={() => handleLinkItemClick(gotoMyStories)}
              className="link-item"
            >
              <FiEdit />
              <span>My Stories</span>
            </div>
            <div
              onClick={() => handleLinkItemClick(gotoWriteStory)}
              className="link-item"
            >
              <FiEdit />
              <span>Write Story</span>
            </div>
            <div className="link-item">
              <FiBell />
              <span>Notification</span>
            </div>
            <div className="link-item">
              <FiSettings />
              <span>Setting</span>
            </div>
            <div
              onClick={() => handleLinkItemClick(doLogout)}
              className="link-item"
            >
              <FiLogOut />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </NavUserWrapper>
    </>
  );
}

const NavUserOverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 990;
  background: rgba(0, 0, 0, 0.5);
  cursor: default;
`;

const NavUserWrapper = styled.div`
  position: relative;
  z-index: 991;
  .nav-user-box {
    width: 200px;
    box-shadow: var(--shadow-figma);
    padding: 12px 0;
    border: 0.5px solid #ddd;
    background: #fff;
    border-radius: var(--br);
    position: absolute;
    top: 0;
    right: 0;

    header {
      text-align: center;
      margin-bottom: 12px;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-bottom: 10px;
      }
      .name {
        font-size: 12px;
        color: var(--text-black);
      }
      .email {
        font-size: 10px;
        color: var(--text-regular);
      }
    }

    .profile-dropdown-links {
      .link-item {
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.05);
        padding: 7px 20px;
        font-size: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;
        cursor: pointer;

        span {
          margin-left: 8px;
          color: var(--text-regular);
          transition: var(--tsn);
        }

        svg {
          transition: var(--tsn);
          stroke: var(--text-regular);
        }

        &:hover {
          span {
            color: var(--text-black);
          }

          svg {
            stroke: var(--text-black);
          }
        }
      }
    }
  }
`;
