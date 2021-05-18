import { Spin } from "antd";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { fixLink } from "../../../core/helpers/file_helper";
import KStoryItem from "../../../core/ui/KStoryItem";
import MultiCarousel from "../../../core/ui/MultiCarousel";

export default function HotStoriesSection({ landing }) {
  return (
    <HotStoriesSectionWrapper>
      <div className="container">
        <header>
          <h1>Hot Stories</h1>
        </header>

        <div className="cards-wrapper">
          {landing.status === "loading" && <Spin size="large" />}
          {landing.status === "data" && (
            <MultiCarousel maxItem={4} dots={false}>
              {landing?.data?.story?.map((el) => (
                <Link href="story/[storyIdentifier]" as={`story/${el?.slug}`}>
                  <a>
                    <KStoryItem
                      key={el?._id}
                      title={el?.title}
                      image={fixLink(el?.thumb_image, "4x3.png")}
                      user_name={el?.author?.full_name}
                      comment_count={el?.views || 0}
                    />
                  </a>
                </Link>
              ))}
            </MultiCarousel>
          )}
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
`;
