import React from "react";
import { FiUser } from "react-icons/fi";
import styled from "styled-components";
import KButtonBlue from "../../../core/components/KButtonBlue";

export default function TravelExpertSection() {
  return (
    <TravelExpertSectionWrapper>
      <div className="container">
        <header>
          <h1>Travel Experts</h1>
        </header>

        <div className="cards-wrapper">
          <TravelExpertCard />
          <TravelExpertCard />
          <TravelExpertCard />
        </div>
      </div>
    </TravelExpertSectionWrapper>
  );
}

const TravelExpertCard = () => {
  return (
    <div className="travel-expert-card">
      <div className="cover">
        <img className="cover-image" src="/pg.png" alt="" />
      </div>
      <div className="display-image">
        <img src="images/person.png" alt="" />
      </div>

      <div className="contents">
        <h2 className="name">Mrs. Katrina</h2>
        <div className="followers-destinations flex jcsb">
          <aside>
            <img src="hero-story-people.png" alt="" />
            <span>200 Followers</span>
          </aside>
          <aside>
            <img src="hero-story-people.png" alt="" />
            <span>12 Destinations</span>
          </aside>
        </div>
      </div>

      <div className="call-to-action">
        <KButtonBlue className="profile-btn">View Profile</KButtonBlue>
      </div>
    </div>
  );
};

const TravelExpertSectionWrapper = styled.div`
  margin-bottom: 36px;

  header {
    margin-bottom: 16px;
    h1 {
      font-size: 28px;
      font-weight: 700;
      color: var(--text-black);
    }
  }

  .cards-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;

    @media (max-width: 1000px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .travel-expert-card {
    border-radius: var(--br);
    transition: var(--tsn);
    position: relative;
    background: rgba(238, 238, 238, 0.4);

    .call-to-action {
      text-align: center;
      padding-bottom: 16px;
      .profile-btn {
        font-size: 11px;
      }
    }

    .followers-destinations {
      margin-top: 8px;
      aside {
        display: flex;
        align-items: center;
        span {
          font-size: 11px;
          margin-left: 4px;
        }
        img {
          height: 20px;
        }
      }
    }

    .contents {
      padding: 16px;
      .name {
        text-align: center;
        font-size: 16px;
        color: var(--text-black);
      }
    }

    .cover {
      height: 150px;
      border-radius: var(--br);
      overflow: hidden;
      clip-path: polygon(0 0, 100% 0, 100% 80%, 0 95%);
      img {
        transition: var(--tsn);
        width: 100%;
        height: 100%;
        opacity: 70%;
        object-fit: cover;
      }
      &:hover {
        img.cover-image {
          transition: 0.2s;
          transform: scale(1.05);
        }
      }
    }

    .display-image {
      position: absolute;
      left: calc(50% - 32px);
      top: 100px;
      img {
        border: 2px solid #fff;
        width: 64px;
        height: 64px;
        border-radius: 100%;
        object-fit: cover;
      }
    }
  }
`;
