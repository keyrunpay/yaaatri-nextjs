import React from "react";
import styled from "styled-components";

export default function AdventureSection() {
  return (
    <AdventureSectionWrapper>
      <div className="container">
        <header>
          <h1>Adrenaline Rush</h1>
        </header>

        <div className="cards-wrapper">
          <div className="adventure-card">
            <img src="images/adventure1.png" alt="" />
          </div>
          <div className="adventure-card">
            <img src="images/adventure2.png" alt="" />
          </div>
          <div className="adventure-card">
            <img src="images/adventure3.png" alt="" />
          </div>
        </div>
      </div>
    </AdventureSectionWrapper>
  );
}

const AdventureSectionWrapper = styled.div`
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

  .cards-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;

    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .adventure-card {
    overflow: hidden;
    border-radius: var(--br);
    transition: var(--tsn);
    cursor: pointer;
    width: 100%;
    padding-top: 75%;
    position: relative;

    @media (max-width: 767px) {
      &:last-of-type {
        display: none;
      }
    }

    img {
      position: absolute;
      transition: var(--tsn);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--br);
    }

    &:hover {
      img {
        transition: 0.2s;
        transform: scale(1.05);
      }
    }
  }
`;
