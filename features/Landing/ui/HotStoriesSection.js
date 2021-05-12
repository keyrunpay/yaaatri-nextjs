import React from "react";
import { FiMessageCircle, FiUser } from "react-icons/fi";
import styled from "styled-components";
import MultiCarousel from "../../../core/ui/MultiCarousel";

export default function HotStoriesSection() {
  return (
    <HotStoriesSectionWrapper>
      <div className="container">
        <header>
          <h1>Hot Stories</h1>
        </header>

        <div className="cards-wrapper">
          <MultiCarousel maxItem={4} dots={false}>
            <div className="story-card">
              <div className="img-wrapper">
                <img src="images/story1.png" alt="" />
              </div>
              <h2 className="title">Poon Hill Trek</h2>
              <div className="flex">
                <p className="story-desc">
                  <FiUser /> Kiran
                </p>
                <p className="story-desc">
                  <FiMessageCircle /> 227
                </p>
              </div>
            </div>
            <div className="story-card">
              <div className="img-wrapper">
                <img src="images/story2.png" alt="" />
              </div>
              <h2 className="title">Thrilling @EBC</h2>
              <div className="flex">
                <p className="story-desc">
                  <FiUser /> Kiran
                </p>
                <p className="story-desc">
                  <FiMessageCircle /> 227
                </p>
              </div>
            </div>
            <div className="story-card">
              <div className="img-wrapper">
                <img src="images/story3.png" alt="" />
              </div>
              <h2 className="title">14 days at upper mustang</h2>
              <div className="flex">
                <p className="story-desc">
                  <FiUser /> Kiran
                </p>
                <p className="story-desc">
                  <FiMessageCircle /> 227
                </p>
              </div>
            </div>
            <div className="story-card">
              <div className="img-wrapper">
                <img src="images/story4.png" alt="" />
              </div>
              <h2 className="title">My Canoying Experience</h2>
              <div className="flex">
                <p className="story-desc">
                  <FiUser /> Kiran
                </p>
                <p className="story-desc">
                  <FiMessageCircle /> 227
                </p>
              </div>
            </div>
            <div className="story-card">
              <div className="img-wrapper">
                <img src="/trip.png" alt="" />
              </div>
              <h2 className="title">Kori Village Solo Trek</h2>
              <div className="flex">
                <p className="story-desc">
                  <FiUser /> Kiran
                </p>
                <p className="story-desc">
                  <FiMessageCircle /> 227
                </p>
              </div>
            </div>
          </MultiCarousel>
        </div>
      </div>
    </HotStoriesSectionWrapper>
  );
}

const HotStoriesSectionWrapper = styled.div`
  margin-bottom: 36px;

  header {
    margin-bottom: 16px;
    h1 {
      font-size: 28px;
      font-weight: 700;
      color: var(--text-black);
      @media (max-width: 767px) {
        font-size: 16px;
      }
    }
  }

  .story-card {
    background: rgba(238, 238, 238, 0.4);
    padding: 9px;
    border-radius: var(--br);
    transition: var(--tsn);
    cursor: pointer;
    margin-right: 5px;
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
    }

    &:hover {
      img {
        transition: 0.2s;
        transform: scale(1.05);
      }
    }
  }
`;
