import React from "react";
import styled from "styled-components";
import KButtonOrange from "../../../core/components/KButtonOrange";
import { FiChevronRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <HeroSectionWrapper>
      <div className="container flex jcsb ci">
        <aside className="hero-image">
          <img className="hero-image-wrap" src="/hero.png" />
        </aside>

        <aside className="hero-content">
          <h1 className="hero-title">Life is short and the world is wide !!</h1>
          <p className="hero-description">
            To get the best of your adventure you just need to leave and go
            where you like. We are waiting for you.
          </p>
          <div className="call-to-action flex ci">
            <KButtonOrange className="cta-orange-button">
              <span>Plan a trip</span>
              <span className="icon">
                <FiChevronRight />
              </span>
            </KButtonOrange>

            <div className="cta-read-story flex ci">
              <img src="/hero-story-people.png" alt="" />
              <p className="read-story-title">Read our stories</p>
            </div>
          </div>
        </aside>
      </div>
    </HeroSectionWrapper>
  );
}

const HeroSectionWrapper = styled.div`
  /* height: 630px; */
  margin-top: 16px;
  margin-bottom: 54px;

  .hero-image {
    @media (max-width: 767px) {
      display: none;
    }

    .hero-image-wrap {
      width: 480px;

      @media (max-width: 990px) {
        width: 280px;
      }
    }
  }

  .hero-title {
    font-size: 58px;
    font-weight: 700;
    line-height: 110%;
    color: var(--text-black);
    width: 420px;

    @media (max-width: 990px) {
      font-size: 36px;
    }

    @media (max-width: 767px) {
      font-size: 36px;
      padding: 16px 0 0 0;
      width: auto;
    }
  }

  .hero-description {
    margin-top: 32px;
    font-size: 14px;
    font-weight: 600;
    line-height: 160%;
    color: var(--text-medium);
    width: 320px;
  }

  .call-to-action {
    margin-top: 32px;
  }

  .cta-read-story {
    margin-left: 12px;
    padding: 0 12px;
    cursor: pointer;
    border-radius: 100px;
    height: 48px;
    border: 0.5px solid transparent;

    img {
      height: 24px;
    }

    .read-story-title {
      margin-left: 8px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-black);
      padding-right: 8px;
    }

    &:hover {
      border: 0.5px solid #ddd;
    }
  }

  .cta-orange-button {
    height: 48px;
    width: 210px;
    box-shadow: var(--shadow-figma);

    .icon {
      margin-left: 4px;
      height: 12px;
      svg {
        stroke-width: 3px;
      }
    }
  }
`;
