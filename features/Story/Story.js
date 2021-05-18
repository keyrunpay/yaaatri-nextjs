import React from "react";
import styled from "styled-components";
import CustomizedStory from "./ui/CustomizedStory";
import StoryReader from "./ui/StoryReader";

export default function Story({
  title,
  body,
  cover_image,
  sub_title,
  read_minute,
  author,
  created_at,
}) {
  return (
    <StoryWrapper>
      <header>
        <h1 className="title">{title}</h1>
        <img src="/blue_line.svg" alt="" />
      </header>
      <CustomizedStory />
      <StoryReader
        title={title}
        sub_title={sub_title}
        cover_image={cover_image}
        author={author}
        created_at={created_at}
        read_minute={read_minute}
      />
      <div className="container story-body">
        <div
          className="ck-content"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      </div>
      <br />
    </StoryWrapper>
  );
}

const StoryWrapper = styled.div`
  .story-body {
    margin-top: 16px;
  }

  header {
    padding: 16px 0;
    text-align: center;

    .title {
      font-size: 32px;

      @media (max-width: 767px) {
        font-size: 24px;
        padding: 0 15px;
      }
    }
  }
`;
