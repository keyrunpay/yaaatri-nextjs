import React from "react";
import styled from "styled-components";
import KButtonBlue from "../components/KButtonBlue";

export default function NavBar() {
  return (
    <NavBarWrapper>
      <div className="container">
        <div className="nav-height flex jcsb ci">
          <aside className="logo">
            <h1>Travel</h1>
          </aside>
          <aside className="links">
            <ul>
              <li className="hide-on-mob">Stories</li>
              <li className="hide-on-mob">Destinations</li>
              <li className="hide-on-mob">Adventures</li>
              <li className="hide-on-mob">Experts</li>
              <li>
                <KButtonBlue>Join Us</KButtonBlue>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </NavBarWrapper>
  );
}

const NavBarWrapper = styled.div`
  .nav-height {
    height: 70px;
  }
  .links {
    ul {
      list-style: none;
    }
    li {
      &.hide-on-mob {
        @media (max-width: 767px) {
          display: none;
        }
      }

      display: inline-block;
      margin-right: 20px;
      font-size: 12px;
      font-weight: 600;
      transition: 0.3s;
      color: var(--text-black);
      cursor: pointer;

      &:last-of-type {
        margin-right: 0;
      }
      &:hover {
        color: var(--primary);
      }
    }
  }
`;
