import React from "react";
import styled from "styled-components";
import { fixLink } from "../../../core/helpers/file_helper";
import KButtonOrange from "../../../core/components/KButtonOrange";
import useAuthInfo from "../../../core/hooks/useAuthInfo";
import useLanding from "../../../core/hooks/useLanding";
import Link from "next/link";
import moment from "moment";

export default function AboutAuthor({ author_name, author_image, created_at }) {
  const user = useAuthInfo();
  const { landing, fetchLanding } = useLanding();

  React.useEffect(() => {
    if (landing.status !== "data") fetchLanding();
  }, []);

  return (
    <AboutAuthorWrapper>
      <div className="container">
        <div className="about-author-head">
          {/* <h1 className="title">About Author</h1> */}
          <img className="author-image" src={author_image} alt="" />
          <h2 className="author-name">{author_name}</h2>
          <p className="joined-date">
            Joined on {moment(created_at).format("Do MMM, YYYY")}
          </p>
        </div>

        <div className="author-stats">
          <div className="stats-item">
            <h2 className="count">24</h2>
            <div className="label">Writes</div>
          </div>
          <div className="stats-item">
            <h2 className="count">202</h2>
            <div className="label">Reads</div>
          </div>
          <div className="stats-item">
            <h2 className="count">70k+</h2>
            <div className="label">Likes</div>
          </div>
        </div>

        <div className="author-cta">
          <KButtonOrange className="cta-profile">View Profile</KButtonOrange>
          <KButtonOrange className="cta-ghost">
            More from this author
          </KButtonOrange>
        </div>

        <div className="more-story-section">
          <h1 className="title">More reads for you</h1>

          <div className="more-story-wrapper">
            {landing?.data?.story?.map((el) => (
              <Link
                key={el?._id}
                href="/story/[storyIdentifier]"
                as={`/story/${el?.slug}`}
              >
                <a>
                  <div className="more-story-item">
                    <aside>
                      <div className="img-wrap">
                        <img src={fixLink(el?.thumb_image, "4x3.png")} alt="" />
                      </div>
                    </aside>
                    <aside>
                      <h2 className="title">{el?.title}</h2>
                      <div className="author-name">{el?.author?.full_name}</div>
                      <div className="date">{el?.created_at}</div>
                    </aside>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AboutAuthorWrapper>
  );
}

const AboutAuthorWrapper = styled.div`
  padding: 36px 0 0 0;
  background: var(--primary);
  border-radius: 12px 12px 0 0;

  .container {
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 58px;
  }

  .more-story-section {
    padding-top: 36px;
    & > .title {
      font-size: 28px;
      color: #fff;
      margin-bottom: 16px;
    }

    .more-story-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      grid-gap: 20px;

      .more-story-item {
        display: flex;
        border: 1px solid transparent;
        padding: 8px;
        border-radius: var(--br);
        cursor: pointer;
        transition: var(--tsn);

        h2.title {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: normal !important;
        }

        .author-name {
          font-size: 10px;

          color: rgba(255, 255, 255, 0.6);
        }

        .img-wrap {
          overflow: hidden;
          border-radius: var(--br);
        }

        &:hover {
          border: 1px solid rgba(255, 255, 255, 0.2);
          img {
            transform: scale(1.05);
          }
        }
      }
      img {
        transition: var(--tsn);
        width: 64px;
        margin-right: 8px;
        border-radius: var(--br);
      }
    }
  }

  .author-cta {
    text-align: center;
    padding-top: 16px;

    .cta-profile {
      height: 30px;
      font-size: 10px;
      margin-right: 12px;
      box-shadow: var(--shadow-figma);
      transition: var(--tsn);
      &:hover {
        opacity: 0.9;
      }
    }

    .cta-ghost {
      height: 30px;
      font-size: 10px;
      margin-right: 12px;
      background: transparent;
      box-shadow: var(--shadow-figma);
      transition: var(--tsn);
      &:hover {
        opacity: 0.7;
      }
    }
  }

  .author-stats {
    display: flex;
    justify-content: center;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 12px;

    .stats-item {
      padding: 12px 24px;
      margin-right: 12px;
      border-radius: var(--br);
      border: 0.5px solid rgba(255, 255, 255, 0.2);

      .count {
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
      }

      .label {
        font-size: 11px;
      }
    }
  }

  .about-author-head {
    text-align: center;
    color: #fff;

    .author-name {
      color: #fff;
      font-size: 14px;
      margin-top: 4px;
    }

    .title {
      color: #fff;
      font-size: 24px;
      margin-bottom: 8px;
    }

    .joined-date {
      font-size: 10px;
      color: var(--gray700);
    }

    .author-image {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
  }
`;
