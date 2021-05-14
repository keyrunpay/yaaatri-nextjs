import React from "react";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterWrapper>
      <div className="container">
        <div className="footer-grid">
          <div className="one">
            <h2 className="heading">Platforms</h2>
            <ul>
              <li>Web Applications</li>
              <li>Mobile Applications</li>
              <li>Email Service</li>
            </ul>
          </div>

          <div className="two">
            <h2 className="heading">Resources</h2>
            <ul>
              <li>Blog</li>
              <li>Podcasts</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div className="three">
            <h2 className="heading">Informative</h2>
            <ul>
              <li>About Us</li>
              <li>Hall of Fame</li>
              <li>Credits</li>
            </ul>
          </div>

          <div className="one">
            <h2 className="heading">Others</h2>
            <ul>
              <li>Terms of use</li>
              <li>Privacy Policy</li>
              <li>Relese Notes</li>
            </ul>
          </div>
        </div>

        <div className="footer-social">
          <div className="left">
            <h1 className="title">Travel</h1>
          </div>
          <div className="right">
            <div className="social-list">
              <div className="social-item">
                <FiFacebook />
              </div>
              <div className="social-item">
                <FiInstagram />
              </div>
              <div className="social-item">
                <FiTwitter />
              </div>
            </div>
            <p className="copy-right">
              &copy; Travel Social Network, by Buggged
            </p>
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  padding-top: 58px;
  background-color: var(--primary);
  background-image: url("images/bg.svg");
  background-repeat: no-repeat;
  /* background-size: cover; */
  background-position: bottom;

  .title {
    font-size: 32px;
    color: #f2f2f2;
    @media (max-width: 767px) {
      text-align: center;
    }
  }

  .copy-right {
    font-size: 12px;
    font-weight: 500;
    text-align: right;
    margin-right: 12px;
    color: #f2f2f2;

    @media (max-width: 767px) {
      text-align: center;
    }
  }

  .footer-social {
    display: flex;
    justify-content: space-between;
    padding-bottom: 58px;

    @media (max-width: 767px) {
      display: block;
    }

    .social-list {
      display: flex;
      justify-content: flex-end;

      @media (max-width: 767px) {
        justify-content: center;
      }

      .social-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 100%;
        font-size: 22px;
        cursor: pointer;
        transition: var(--tsn);
        margin-right: 16px;
        margin-bottom: 8px;

        &:last-of-type {
          margin-right: 0;
        }

        @media (max-width: 767px) {
          box-shadow: var(--shadow-figma);
          width: 32px;
          height: 32px;
          font-size: 12px;
          margin-top: 5px;
          margin-bottom: 16px;
        }

        &:hover {
          box-shadow: var(--shadow-figma);
        }
        svg {
          stroke: #f2f2f2;
        }
      }
    }
  }

  .footer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 40px;
    justify-items: center;
    padding-bottom: 48px;

    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
      justify-items: start;
    }

    .heading {
      font-size: 14px;
      font-weight: 600;
      color: #f2f2f2;
      margin-bottom: 8px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        font-size: 12px;
        font-weight: 600;
        color: #bdbdbd;
        margin-bottom: 4px;
        cursor: pointer;
        transition: var(--tsn);

        &:hover {
          color: #f2f2f2;
          transform: translateX(1.5px);
        }
      }
    }
  }
`;
