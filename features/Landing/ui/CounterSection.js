import React from "react";
import styled from "styled-components";
import KButtonOrange from "../../../core/components/KButtonOrange";

export default function CounterSection() {
  return (
    <CounterSectionWrapper>
      <div className="container">
        <h1 className="title">So far and counting...</h1>

        <div className="counter-wrapper">
          <div className="count-items">
            <h1 className="count">125</h1>
            <div className="label">Destinations</div>
          </div>
          <div className="count-items">
            <h1 className="count">12</h1>
            <div className="label">Adventures</div>
          </div>
          <div className="count-items">
            <h1 className="count">75</h1>
            <div className="label">Stories</div>
          </div>
          <div className="count-items">
            <h1 className="count">25</h1>
            <div className="label">Travel Experts</div>
          </div>
          <div className="count-items">
            <h1 className="count">12.5k</h1>
            <div className="label">Users</div>
          </div>
        </div>

        <div className="cta-section">
          <KButtonOrange className="cta-join-us">Join Us</KButtonOrange>
          <KButtonOrange className="cta-send-feedback">
            Send Feedback
          </KButtonOrange>
        </div>
      </div>
    </CounterSectionWrapper>
  );
}

const CounterSectionWrapper = styled.div`
  padding: 58px 0 0 0;
  background: var(--primary);
  border-radius: 12px 12px 0 0;

  .cta-section {
    text-align: center;
    margin-bottom: 58px;

    @media (max-width: 600px) {
      text-align: left;
    }
  }
  .cta-join-us {
    height: 40px;
    width: 150px;
    margin-right: 12px;
    font-size: 12px;
    box-shadow: var(--shadow-figma);
  }

  .cta-send-feedback {
    height: 38px;
    background: transparent;
    border: 1px solid var(--secondary);
    width: 150px;
    font-size: 12px;
    box-shadow: var(--shadow-figma);
  }

  .container {
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);
  }

  .counter-wrapper {
    text-align: center;
    margin-top: 24px;

    @media (max-width: 600px) {
      text-align: left;
    }
  }

  .count-items {
    display: inline-block;
    text-align: center;
    margin-right: 36px;
    color: #fff;
    margin-bottom: 36px;

    &:last-of-type {
      margin-right: 0;
    }

    .count {
      font-size: 22px;
      color: #fff;
    }

    .label {
      font-size: 12px;
      font-weight: 600;
    }
  }

  .title {
    font-size: 36px;
    color: #fff;
    text-align: center;

    @media (max-width: 600px) {
      font-size: 24px;
      text-align: left;
    }
  }
`;
