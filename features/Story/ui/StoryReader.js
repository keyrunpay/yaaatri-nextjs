import moment from "moment";
import React from "react";
import styled from "styled-components";
import { fixLink } from "../../../core/helpers/file_helper";

export default function StoryReader({
  title,
  sub_title,
  author,
  read_minute,
  cover_image,
  created_at,
}) {
  return (
    <StoryReaderWrapper>
      <div className="container">
        <div className="heading">
          <h1 className="title">{title}</h1>
          <p className="subtitle">{sub_title}</p>
          <p className="author">
            By <strong>{author?.full_name}</strong>
            <span>{moment(created_at).format("MMM DD, YYYY")} </span>{" "}
            {read_minute} min read
          </p>
        </div>
        <div className="cover">
          <img
            className="cover-image"
            src={fixLink(cover_image, "4x3.png")}
            alt=""
          />
        </div>
      </div>
    </StoryReaderWrapper>
  );
}

const StoryReaderWrapper = styled.div`
  .heading {
    .title {
      font-size: 28px;
      color: var(--text-black);
      margin-top: 36px;

      @media (max-width: 767px) {
        font-size: 20px;
      }
    }

    .subtitle {
      font-size: 12px;
      margin-bottom: 8px;

      @media (max-width: 767px) {
        font-size: 11px;
      }
    }

    .author {
      font-size: 12px;

      @media (max-width: 767px) {
        font-size: 11px;
      }

      margin: 8px 0;
      color: var(--text-regular);

      strong {
        margin-right: 15px;
      }

      span {
        margin-right: 15px;
      }
    }
  }

  .cover {
    width: 100%;
    padding-top: 50%;
    position: relative;
    img.cover-image {
      position: absolute;
      object-fit: cover;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: var(--br);
    }
  }
`;
