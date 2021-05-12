import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Carousel from "react-multi-carousel";
import styled from "styled-components";

export default function MultiCarousel({ children, maxItem, dots }) {
  const sliderRef = React.useRef(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1410 },
      items: maxItem || 4,
    },
    desktopx: {
      breakpoint: { max: 1410, min: 1180 },
      items: maxItem || 4,
    },
    desktopy: {
      breakpoint: { max: 1180, min: 1024 },
      items: maxItem || 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 720 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 720, min: 0 },
      items: 2,
    },
  };

  return (
    <MultiCarouselWrapper>
      <div className="cards-wrapper">
        <div
          onClick={() => {
            sliderRef.current.previous();
          }}
          className="next arrow-left"
        >
          <span>
            <FiChevronLeft />
          </span>
        </div>
        <div
          className="next arrow-right"
          onClick={() => {
            sliderRef.current.next();
          }}
        >
          <span>
            <FiChevronRight />
          </span>
        </div>
        <Carousel
          customTransition="all .2s"
          showDots={dots}
          ref={sliderRef}
          arrows={false}
          responsive={responsive}
        >
          {children}
        </Carousel>
      </div>
    </MultiCarouselWrapper>
  );
}

const MultiCarouselWrapper = styled.div`
  .cards-wrapper {
    margin-bottom: 12px;
    position: relative;

    .arrow-left {
      z-index: 100;
      position: absolute;
      top: 50%;
      left: -3px;
      transform: translate(-50%, -50%);
    }
    .arrow-right {
      z-index: 100;
      position: absolute;
      top: 50%;
      right: 7px;
      transform: translate(50%, -50%);
    }
  }

  .slider-arrows {
    display: flex;
    margin-top: 5px;
  }

  .next {
    cursor: pointer;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--primary);
    color: #fff;
    margin: 0 4px;
    transition: 0.2s;
    text-align: center;

    &:hover {
      background: var(--secondary);
    }

    span {
      padding-top: 5px;
      display: inline-block;
      svg {
        stroke-width: 3px;
      }
    }
  }
`;
