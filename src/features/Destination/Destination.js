import React from "react";
import styled from "styled-components";
import { fixLink } from "../../core/helpers/file_helper";
import { Image } from "antd";
import useReadDestination from "./useReadDestination";

const tabs = [
  "Travel Details",
  "Itinerary",
  "Sight Seeing",
  "Trek Cost",
  "Gallary",
];

export default function Destination({ content }) {
  const {
    handleCoverIndexSelect,
    handleTabSelect,
    renderContent,
    selectedCoverIndex,
    selectedTab,
  } = useReadDestination(content);

  return (
    <DestinationWrapper>
      <div className="container">
        <header>
          <div className="title-wrapper">
            <div className="title fp">{content?.name}</div>
          </div>
          <img src="/blue_line.svg" alt="" />
        </header>

        <section className="image-wrapper">
          <Image
            key={selectedCoverIndex}
            className="image-cover"
            src={fixLink(content?.cover_images[selectedCoverIndex])}
          />
          <div className="dots">
            {content?.cover_images?.map((el, index) => (
              <div
                onClick={() => handleCoverIndexSelect(index)}
                key={el}
                className={`dot ${
                  index === selectedCoverIndex ? "selected" : ""
                }`}
              />
            ))}
          </div>
        </section>

        <section className="tabs">
          <div className="tab-wrapper">
            {tabs.map((el, index) => (
              <div
                key={el}
                onClick={() => handleTabSelect(index)}
                className={`tab-item fp ${
                  selectedTab === index ? "selected" : ""
                }`}
              >
                {el}
              </div>
            ))}
          </div>
        </section>

        <section
          className="content ck-content"
          dangerouslySetInnerHTML={{ __html: renderContent() }}
        ></section>
        <br />
      </div>
    </DestinationWrapper>
  );
}

const DestinationWrapper = styled.div`
  header {
    padding: 24px 0;
    text-align: center;

    .title-wrapper {
      text-align: center;
    }

    .title {
      font-size: 32px;
      outline: none;
      display: inline-block;
      padding: 4px 15px;
      margin: 4px 15px;
      max-width: 90%;
      transition: var(--tsn);
      font-weight: bold;
      text-align: center;

      @media (max-width: 767px) {
        font-size: 24px;
        padding: 0 15px;
      }
    }
  }

  section.tabs {
    position: sticky;
    top: 60px;
    background: #fff;
    z-index: 988;
    padding: 16px 0;
    display: flex;

    .tab-wrapper {
      display: flex;
      flex-wrap: wrap;

      .tab-item {
        font-weight: 500;
        font-size: 12px;
        cursor: pointer;
        transition: var(--tsn);
        padding: 2px 10px;
        border-radius: 4px;
        line-height: 26px !important;

        @media (max-width: 500px) {
          font-size: 10px;
          padding: 4px 6px;
        }

        &.selected {
          background: rgba(0, 0, 0, 0.1);
          color: var(--primary);
        }

        &:hover {
          color: var(--primary);
        }
      }
    }
  }

  .image-wrapper {
    margin-top: 20px;
    width: 100%;
    padding-top: 50%;
    position: relative;
    .ant-image {
      position: static !important;
    }
    .dots {
      position: absolute;
      right: 24px;
      bottom: 24px;
      display: flex;
      align-items: center;

      .dot {
        margin-left: 10px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #fff;
        background: var(--primary);
        cursor: pointer;
        box-shadow: var(--shadow);

        &.selected {
          background: var(--secondary);
        }
      }
    }
    .image-cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: var(--br);
      object-fit: cover;
    }
  }
`;
