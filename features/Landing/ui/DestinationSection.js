import React from "react";
import styled from "styled-components";
import MultiCarousel from "../../../core/ui/MultiCarousel";

export default function DestinationSection() {
  const sliderRef = React.useRef(null);
  return (
    <DestinationSectionWrapper>
      <div className="container">
        <header>
          <h1>Discover the touch of nature</h1>
        </header>

        {/* <MultiCarousel maxItem={4}> */}
        <div className="cards-wrapper">
          <div className="destination-card">
            <img src="images/trek1.png" alt="" />
          </div>
          <div className="destination-card">
            <img src="images/trek2.png" alt="" />
          </div>
          <div className="destination-card">
            <img src="images/trek5.png" alt="" />
          </div>
          <div className="destination-card">
            <img src="images/trek4.png" alt="" />
          </div>
        </div>
        {/* </MultiCarousel> */}
      </div>
    </DestinationSectionWrapper>
  );
}

const DestinationSectionWrapper = styled.div`
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
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 16px;

    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .destination-card {
    overflow: hidden;
    border-radius: var(--br);
    transition: var(--tsn);
    cursor: pointer;
    width: 100%;
    padding-top: 75%;
    position: relative;

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
