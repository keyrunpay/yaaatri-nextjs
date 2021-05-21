import React from "react";
import styled from "styled-components";

export default function SubPageHeader({ title, orange_line }) {
  return (
    <SubPageHeaderWrapper>
      <header>
        <h1 className="title">{title}</h1>
        <img src={orange_line ? "read_line.svg" : "blue_line.svg"} alt="" />
      </header>
    </SubPageHeaderWrapper>
  );
}

const SubPageHeaderWrapper = styled.div`
  header {
    padding: 16px 0;
    text-align: center;

    .title {
      font-size: 32px;

      @media (max-width: 767px) {
        font-size: 24px;
        padding: 0 15px;
      }
    }
  }
`;
