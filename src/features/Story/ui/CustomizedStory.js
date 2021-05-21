import React from "react";
import styled from "styled-components";
import MultiCarousel from "../../../core/ui/MultiCarousel";

export default function CustomizedStory() {
  return (
    <CustomizedStoryWrapper>
      <div className="container">
        <h1 className="title">Know about various travel destinations</h1>
        <MultiCarousel maxItem={5} dots={false}>
          <div className="story-item">
            <img src="/images/trek1.png" alt="" />
          </div>
          <div className="story-item">
            <img src="/images/trek2.png" alt="" />
          </div>
          <div className="story-item">
            <img src="/images/trek3.png" alt="" />
          </div>
          <div className="story-item">
            <img src="/images/trek4.png" alt="" />
          </div>
          <div className="story-item">
            <img src="/images/trek5.png" alt="" />
          </div>
        </MultiCarousel>
      </div>
    </CustomizedStoryWrapper>
  );
}

const CustomizedStoryWrapper = styled.div`
  .title {
    font-size: 24px;
    padding: 16px 0;

    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  .story-item {
    padding-top: 75%;
    position: relative;
    margin-right: 20px;
    cursor: pointer;
    border-radius: var(--br);
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      object-fit: cover;
      border-radius: var(--br);
      height: 100%;
      transition: var(--tsn);
    }

    &:hover {
      img {
        transform: scale(1.03);
      }
    }
  }
`;
