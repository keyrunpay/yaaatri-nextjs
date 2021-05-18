import React from "react";
import styled from "styled-components";
import { FiMessageCircle, FiUser } from "react-icons/fi";

export default function KStoryItem({ title, user_name, comment_count, image }) {
  return (
    <KStoryItemWrapper>
      <div className="story-card">
        <div className="img-wrapper">
          <img src={image} alt="" />
        </div>
        <h2 className="title">{title}</h2>
        <div className="flex">
          <p className="story-desc">
            <FiUser /> {user_name}
          </p>
          <p className="story-desc">
            <FiMessageCircle /> {comment_count}
          </p>
        </div>
      </div>
    </KStoryItemWrapper>
  );
}

const KStoryItemWrapper = styled.div`
  .story-card {
    background: rgba(238, 238, 238, 0.4);
    padding: 9px;
    border-radius: var(--br);
    transition: var(--tsn);
    cursor: pointer;
    margin-right: 10px;

    .title {
      font-size: 14px;
      color: var(--text-black);
      font-weight: 600;
      margin: 3px 0;
    }

    .story-desc {
      font-size: 12px;
      margin-right: 10px;
      font-weight: 500;
      color: var(--text-black);
      svg {
        stroke: var(--primary);
        stroke-width: 3px;
      }
    }

    .img-wrapper {
      overflow: hidden;
      border-radius: var(--br);
      width: 100%;
      padding-top: 75%;
      position: relative;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: var(--br);
      transition: var(--tsn);
      object-fit: cover;
    }

    &:hover {
      img {
        transition: 0.2s;
        transform: scale(1.05);
      }
    }
  }
`;
