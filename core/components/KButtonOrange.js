import React from "react";
import styled from "styled-components";

export default function KButtonOrange({ children, ...props }) {
  return <KButtonBlueWrapper {...props}>{children}</KButtonBlueWrapper>;
}

const KButtonBlueWrapper = styled.button`
  background: var(--secondary);
  padding: 7px 25px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`;
