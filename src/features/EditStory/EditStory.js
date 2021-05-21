import { Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { FiCheck, FiImage } from "react-icons/fi";
import styled from "styled-components";
import KButtonBlue from "../../core/components/KButtonBlue";
import KFileUpload from "../../core/components/KFileUpload";
import KImageCropperModal from "../../core/components/KImageCropperModal";
import { fixLink, getUrlFromFile } from "../../core/helpers/file_helper";
import useAuthInfo from "../../core/hooks/useAuthInfo";
import MultiCarousel from "../../core/ui/MultiCarousel";
import {
  onAddStory,
  onReadOneStory,
  onUpdateStory,
} from "../../services/story.service";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import KButtonOrange from "../../core/components/KButtonOrange";
import { useRouter } from "next/router";
import WriteStoryDrawer from "../WriteStory/WriteStoryDrawer";

let storyIdentifier = "";

export default function EditStory() {
  const titleRef = React.useRef(null);
  const [storyContent, setStoryContent] = React.useState({
    title: "Write your title here",
    thumb_image: "",
    cover_image: "",
    body: "",
    sub_title: "Write your story subtitle here",
    read_minute: 15,
    loaded: false,
  });
  const user = useAuthInfo();
  const router = useRouter();

  const [selectedThumb, setSelectedThumb] = React.useState(null);
  const [selectedCover, setSelectedCover] = React.useState(null);
  const [addLoading, setAddLoading] = React.useState(false);
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [showWriteStory, setShowWriteStory] = React.useState(false);

  React.useEffect(() => {
    storyIdentifier = router.query?.identifier;
    if (!!router.query?.identifier) {
      fetchStoryDetails();
    }
  }, [router.query]);

  const fetchStoryDetails = async () => {
    try {
      setAddLoading(true);
      const res = await onReadOneStory(storyIdentifier);
      setAddLoading(false);
      setStoryContent({
        title: res?.title,
        thumb_image: res?.thumb_image,
        cover_image: res?.cover_image,
        body: res?.body,
        sub_title: res?.sub_title,
        read_minute: res?.read_minute,
        loaded: true,
      });
    } catch (err) {
      setAddLoading(false);
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (!!storyIdentifier) {
      localStorage.setItem("story_content_edit", JSON.stringify(storyContent));
      localStorage.setItem("story_identifier_edit", storyIdentifier);
    }
  }, [storyContent, storyIdentifier]);

  const loadFromLS = () => {
    const si = localStorage.getItem("story_identifier_edit");
    const sc = localStorage.getItem("story_content_edit");
    if (!!si) {
      storyIdentifier = si;
    }
    if (!!sc) {
      setStoryContent(JSON.parse(sc));
    }
  };

  React.useEffect(() => {
    loadFromLS();
  }, []);

  const handleThumbUpload = async (file) => {
    if (!storyIdentifier) return;
    try {
      const src = await getUrlFromFile(file);
      setSelectedThumb(src);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCoverUpload = async (file) => {
    if (!storyIdentifier) return;
    try {
      const src = await getUrlFromFile(file);
      setSelectedCover(src);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditStory = async () => {
    if (!storyIdentifier) return;
    try {
      setShowWriteStory(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateStory = async (payload) => {
    setUpdateLoading(true);
    try {
      await onUpdateStory(storyIdentifier, payload);
      setUpdateLoading(false);
    } catch (err) {
      setUpdateLoading(false);
    }
  };

  const handlePublishStory = async () => {
    setUpdateLoading(true);
    try {
      await onUpdateStory(storyIdentifier, {
        ...storyContent,
        status: "Published",
      });
      setUpdateLoading(false);
      localStorage.removeItem("story_identifier_edit");
      localStorage.removeItem("story_content_edit");
      router.push("/my_stories");
    } catch (err) {
      setUpdateLoading(false);
    }
  };

  return (
    <StoryWrapper>
      <header>
        <div className="title-wrapper">
          <input
            ref={titleRef}
            onChange={(e) =>
              setStoryContent((pC) => ({ ...pC, title: e.target.value }))
            }
            className="title fp"
            value={storyContent?.title}
          />
        </div>
        <img src="blue_line.svg" alt="" />
      </header>

      <CustomizedStoryWrapper>
        <div className="container">
          <div className="flex ci">
            <h1 className="title">Your story thubnails</h1>
            <Tooltip title="Change your thumbnail" placement="top">
              <KFileUpload onUpload={handleThumbUpload}>
                <KButtonBlue className="thumbnail-change-btn">
                  {addLoading && (
                    <AiOutlineLoading3Quarters className="rotate" />
                  )}
                  {!addLoading && <FiImage />}
                </KButtonBlue>
              </KFileUpload>
            </Tooltip>
          </div>
          <MultiCarousel maxItem={4} dots={false}>
            <div className="story-item">
              <img
                src={fixLink(storyContent?.thumb_image, "/images/trek2.png")}
                alt=""
              />
            </div>
            <div className="story-item">
              <img
                src={fixLink(storyContent?.thumb_image, "/images/trek2.png")}
                alt=""
              />
            </div>
            <div className="story-item">
              <img
                src={fixLink(storyContent?.thumb_image, "/images/trek2.png")}
                alt=""
              />
            </div>
            <div className="story-item">
              <img
                src={fixLink(storyContent?.thumb_image, "/images/trek2.png")}
                alt=""
              />
            </div>
          </MultiCarousel>
        </div>
      </CustomizedStoryWrapper>

      <StoryReaderWrapper>
        <div className="container">
          <div className="heading">
            <h1 className="title">{storyContent?.title}</h1>
            <input
              className="subtitle editable"
              value={storyContent?.sub_title}
              onChange={(e) =>
                setStoryContent((pC) => ({ ...pC, sub_title: e.target.value }))
              }
            />

            <p className="author">
              By <strong>{user?.name}</strong>
              <span> {moment().format("MMM DD, YYYY")} </span>
              <input
                className="editable"
                style={{ width: 55, textAlign: "center", marginRight: 8 }}
                onChange={(e) =>
                  setStoryContent((pC) => ({
                    ...pC,
                    read_minute: parseFloat(e?.target?.value || 0),
                  }))
                }
                value={storyContent?.read_minute}
              />
              min read
            </p>
          </div>
          <div className="cover">
            <KFileUpload onUpload={handleCoverUpload}>
              <KButtonBlue className="thumbnail-change-btn">
                {addLoading && <AiOutlineLoading3Quarters className="rotate" />}
                {!addLoading && <FiImage />}
              </KButtonBlue>
            </KFileUpload>
            <img
              className="cover-image"
              src={fixLink(storyContent?.cover_image, "images/everest.png")}
              alt=""
            />
          </div>
        </div>
      </StoryReaderWrapper>

      <div className="container story-body">
        <div className="cta-wrapper flex ci">
          <h1>Your Story Will Go Below</h1>
          <KButtonBlue onClick={handleEditStory} className="cta">
            {addLoading ? (
              <AiOutlineLoading3Quarters className="rotate" />
            ) : (
              <span>Edit Story</span>
            )}
          </KButtonBlue>
        </div>

        {!!storyContent?.body ? (
          <div
            className="ck-content"
            dangerouslySetInnerHTML={{ __html: storyContent?.body }}
          ></div>
        ) : (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
            soluta officiis eaque voluptate sequi ut laborum consequuntur facere
            nostrum alias eveniet blanditiis totam aspernatur doloribus
            temporibus dolor culpa, quisquam corrupti animi dolore amet deserunt
            nam recusandae perspiciatis. Impedit, tempore tempora in sunt quod
            facilis saepe recusandae sit quisquam nostrum! Voluptatem.
          </p>
        )}

        {!!storyContent?.loaded && (
          <WriteStoryDrawer
            visible={showWriteStory && !!storyIdentifier}
            onClose={() => setShowWriteStory(false)}
            name={storyIdentifier}
            body={storyContent?.body}
            onSave={(body) => {
              setStoryContent((pC) => ({ ...pC, body }));
              setShowWriteStory(false);
              handleUpdateStory({
                ...storyContent,
                body,
              });
            }}
          />
        )}
      </div>

      <KImageCropperModal
        visible={!!selectedThumb && !!storyIdentifier}
        ratio={4 / 3}
        onCancel={() => setSelectedThumb(null)}
        src={selectedThumb}
        sub_path="story_thumb"
        file_name={storyIdentifier}
        onCompleted={(res) => {
          setStoryContent((pC) => ({ ...pC, thumb_image: res.path }));
          handleUpdateStory({
            ...storyContent,
            thumb_image: res.path,
          });
        }}
      />

      <KImageCropperModal
        visible={!!selectedCover && !!storyIdentifier}
        ratio={2 / 1}
        onCancel={() => setSelectedCover(null)}
        src={selectedCover}
        sub_path="story_cover"
        file_name={storyIdentifier}
        onCompleted={(res) => {
          setStoryContent((pC) => ({ ...pC, cover_image: res.path }));
          handleUpdateStory({
            ...storyContent,
            cover_image: res.path,
          });
        }}
      />

      <div className="story-progress-status">
        <div className="status-wrapper">
          <div className="sts">Story Status</div>
          <div className="flex ci">
            {(addLoading || updateLoading) && (
              <AiOutlineLoading3Quarters className="rotate" />
            )}
            {!addLoading && !updateLoading && (
              <FiCheck style={{ color: "green" }} />
            )}
            <p>
              {addLoading && "Fetching Story"}
              {updateLoading && "Updating Story"}
              {!updateLoading && !addLoading && "Saved"}
            </p>
          </div>
        </div>

        <div className="cta-wrapper">
          <KButtonOrange onClick={handlePublishStory} className="cta-publish">
            Publish Story
          </KButtonOrange>
        </div>
      </div>
    </StoryWrapper>
  );
}

const StoryWrapper = styled.div`
  .story-progress-status {
    position: fixed;
    right: 40px;
    bottom: 40px;

    .cta-wrapper {
      margin-top: 10px;
      .cta-publish {
        font-size: 12px;
        box-shadow: var(--shadow-figma);
      }
    }

    .status-wrapper {
      padding: 10px 24px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: var(--br);
    }

    .sts {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-regular);
      margin-bottom: 4px;
    }

    p {
      font-weight: 600;
      font-size: 10px;
      margin-left: 8px;
    }
  }

  .story-body {
    padding: 36px 0;
    .cta-wrapper {
      margin-bottom: 12px;
    }
    .cta {
      margin-left: 16px;
    }
  }

  .thumbnail-change-btn {
    padding: 8px;
    box-shadow: var(--shadow-figma);
  }
  .editable {
    outline: none;
    display: inline-block;
    padding: 4px 15px;
    margin: 4px 0;
    border: 1px solid #ddd;
    transition: var(--tsn);
    border-radius: var(--br);
  }

  header {
    padding: 16px 0;
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

  .mock-story {
    padding: 24px 0;
    font-size: 12px;
  }
`;

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
      width: 600px;
      max-width: 100%;
      display: block;

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

    .thumbnail-change-btn {
      position: absolute;
      z-index: 5;
      right: 10px;
      top: -40px;
    }
  }
`;

const CustomizedStoryWrapper = styled.div`
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
