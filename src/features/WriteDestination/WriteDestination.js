import React from "react";
import styled from "styled-components";
import WriteStoryDrawer from "../WriteStory/WriteStoryDrawer";
import KButtonOrange from "../../core/components/KButtonOrange";
import useWriteDestination from "./useWriteDestination";
import KImageCropperModal from "../../core/components/KImageCropperModal";
import KFileUpload from "../../core/components/KFileUpload";
import KSpinner from "../../core/components/KSpinner";
import { getUrlFromFile } from "../../core/helpers/file_helper";
import { fixLink } from "../../core/helpers/file_helper";
import { Image, message, Tooltip } from "antd";
import MultiCarousel from "../../core/ui/MultiCarousel";
import { FiImage } from "react-icons/fi";

const tabs = [
  "Travel Details",
  "Itinerary",
  "Sight Seeing",
  "Trek Cost",
  "Gallary",
];

export default function WriteDestination() {
  const {
    content,
    handleContent,
    selectedTab,
    handleTabSelect,
    showEditor,
    handleClickCloseEditor,
    handleClickShowEditor,
    renderContent,
    selectedCover,
    setSelectedCover,
    handleCoverUpload,
    selectedCoverIndex,
    handleCoverIndexSelect,
    addDestinationLoading,
    handleAddDestination,
  } = useWriteDestination();
  const [selectedThumb, setSelectedThumb] = React.useState(null);

  const handleThumbUpload = async (file) => {
    try {
      const src = await getUrlFromFile(file);
      setSelectedThumb(src);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DestinationWrapper>
      <div className="container">
        <header>
          <div className="title-wrapper">
            <input
              onChange={(e) => handleContent("name", e.target.value)}
              className="title fp"
              value={content?.name}
            />
          </div>
          <img src="blue_line.svg" alt="" />
        </header>

        <CustomizedStoryWrapper>
          <div className="flex jcsb ci">
            <h1 className="title">Your story thubnails</h1>
            <Tooltip title="Change your thumbnail" placement="top">
              <KFileUpload onUpload={handleThumbUpload}>
                <KButtonOrange className="thumbnail-change-btn">
                  <FiImage /> <p>Upload Thumbnail</p>
                </KButtonOrange>
              </KFileUpload>
            </Tooltip>
          </div>
          <MultiCarousel maxItem={4} dots={false}>
            <div className="story-item">
              <img
                src={fixLink(content?.thumb_image) || "images/trek2.png"}
                alt=""
              />
            </div>
            <div className="story-item">
              <img
                src={fixLink(content?.thumb_image) || "images/trek2.png"}
                alt=""
              />
            </div>
            <div className="story-item">
              <img
                src={fixLink(content?.thumb_image) || "images/trek2.png"}
                alt=""
              />
            </div>
            <div className="story-item">
              <img
                src={fixLink(content?.thumb_image) || "images/trek2.png"}
                alt=""
              />
            </div>
          </MultiCarousel>
        </CustomizedStoryWrapper>

        <br />
        <br />

        <section className="image-wrapper">
          <Image
            key={selectedCoverIndex}
            className="image-cover"
            src={fixLink(content?.cover_images[selectedCoverIndex])}
          />

          <div className="dots">
            {content.cover_images?.map((el, index) => (
              <div
                onClick={() => handleCoverIndexSelect(index)}
                key={el}
                className={`dot ${
                  index === selectedCoverIndex ? "selected" : ""
                }`}
              />
            ))}
          </div>

          <div className="cta">
            <KFileUpload
              onUpload={async (file) => {
                if (content.cover_images?.length > 3) {
                  message.info("You can only upload at max 4 photos in cover");
                  return "";
                }
                const src = await getUrlFromFile(file);
                setSelectedCover(src);
              }}
            >
              <KButtonOrange className="cta-button">Upload Cover</KButtonOrange>
            </KFileUpload>
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
          <aside>
            <KButtonOrange
              onClick={handleClickShowEditor}
              className="cta-button"
            >
              Edit {tabs[selectedTab]}
            </KButtonOrange>
          </aside>
        </section>

        <section
          className="content ck-content"
          dangerouslySetInnerHTML={{ __html: renderContent() }}
        ></section>
        <br />
      </div>
      {/* File Uploaders */}

      <KImageCropperModal
        visible={!!selectedThumb}
        ratio={4 / 3}
        onCancel={() => setSelectedThumb(null)}
        src={selectedThumb}
        sub_path="destination_thumb"
        onCompleted={(res) => {
          handleContent("thumb_image", res?.path);
        }}
      />

      <KImageCropperModal
        visible={!!selectedCover}
        ratio={2 / 1}
        onCancel={() => setSelectedCover(null)}
        src={selectedCover}
        sub_path="destination_cover"
        onCompleted={(res) => {
          handleCoverUpload(res?.path);
        }}
      />

      {/* Editors */}
      {selectedTab === 0 && (
        <WriteStoryDrawer
          title={tabs[selectedTab]}
          visible={showEditor.trek_details}
          body={content.trek_details}
          onClose={handleClickCloseEditor}
          onSave={(html) => {
            handleContent("trek_details", html);
            handleClickCloseEditor();
          }}
        />
      )}
      {selectedTab === 1 && (
        <WriteStoryDrawer
          title={tabs[selectedTab]}
          visible={showEditor.itinerary}
          body={content.itinerary}
          onClose={handleClickCloseEditor}
          onSave={(html) => {
            handleContent("itinerary", html);
            handleClickCloseEditor();
          }}
        />
      )}
      {selectedTab === 2 && (
        <WriteStoryDrawer
          title={tabs[selectedTab]}
          body={content.sight_seeing}
          visible={showEditor.sight_seeing}
          onClose={handleClickCloseEditor}
          onSave={(html) => {
            handleContent("sight_seeing", html);
            handleClickCloseEditor();
          }}
        />
      )}
      {selectedTab === 3 && (
        <WriteStoryDrawer
          title={tabs[selectedTab]}
          body={content.trek_cost}
          visible={showEditor.trek_cost}
          onClose={handleClickCloseEditor}
          onSave={(html) => {
            handleContent("trek_cost", html);
            handleClickCloseEditor();
          }}
        />
      )}

      <div className="destination-cta-action">
        <div className="cta-wrapper">
          <KSpinner spinning={addDestinationLoading}>
            <KButtonOrange
              onClick={handleAddDestination}
              className="cta-publish"
            >
              Publish <br /> Destination
            </KButtonOrange>
          </KSpinner>
        </div>
      </div>
    </DestinationWrapper>
  );
}

const DestinationWrapper = styled.div`
  .cta-button {
    font-size: 11px;
    font-weight: 500;
  }

  .destination-cta-action {
    position: fixed;
    right: 40px;
    bottom: 40px;

    .cta-wrapper {
      margin-top: 10px;
      .cta-publish {
        font-size: 12px;
        font-weight: 500;
        box-shadow: var(--shadow-figma);
      }
    }
  }

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
      border: 1px solid #ddd;
      transition: var(--tsn);
      border-radius: var(--br);
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
    justify-content: space-between;

    .cta-button {
      width: 150px;
    }

    @media (max-width: 767px) {
      display: block;
      aside {
        margin-top: 12px;
      }
    }

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
    .ant-image-preview-switch-left {
      background: var(--primary) !important;
    }
    .ant-image-preview-switch-right {
      background: var(--primary) !important;
    }
    .cta {
      position: absolute;
      top: -40px;
      right: 0;
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

const CustomizedStoryWrapper = styled.div`
  .thumbnail-change-btn {
    font-size: 11px;
    font-weight: 500;
    display: flex;
    align-items: center;
    p {
      margin-left: 4px;
    }
  }
  .title {
    font-size: 24px;
    padding: 16px 0;
    margin-right: 16px;

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
