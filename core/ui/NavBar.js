import Link from "next/link";
import React from "react";
import styled from "styled-components";
import KButtonBlue from "../components/KButtonBlue";
import useAuthInfo from "../hooks/useAuthInfo";
import LoginBox from "./LoginBox";
import NavUserDropdown from "./NavUserDropdown";

export default function NavBar() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showNavUserDropdown, setShowNavUserDropdown] = React.useState(false);
  const user = useAuthInfo();

  return (
    <NavBarWrapper>
      <div className="container">
        <div className="nav-height flex jcsb ci">
          <aside className="logo">
            <Link href="/">
              <a>
                <h1>Travel</h1>
              </a>
            </Link>
          </aside>
          <aside className="links">
            <div className="nav-links hide-on-mob">Stories</div>
            <div className="nav-links hide-on-mob">Destinations</div>
            <div className="nav-links hide-on-mob">Adventures</div>
            <div className="nav-links hide-on-mob">Experts</div>
            <div className="nav-links">
              {user?.isLogged ? (
                <img
                  onClick={() => setShowNavUserDropdown(true)}
                  className="logged-user-image"
                  src={user?.image}
                  alt=""
                />
              ) : (
                <KButtonBlue
                  style={{ fontSize: 12 }}
                  onClick={() => setShowLogin(true)}
                >
                  Join Us
                </KButtonBlue>
              )}
            </div>
          </aside>
        </div>
        <LoginBox visible={showLogin} onClose={() => setShowLogin(false)} />
        <NavUserDropdown
          visible={showNavUserDropdown}
          onClose={() => setShowNavUserDropdown(false)}
        />
      </div>
    </NavBarWrapper>
  );
}

const NavBarWrapper = styled.div`
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 989;

  .logo {
    a {
      text-decoration: none;
      color: var(--text-black);
    }
  }

  .logged-user-image {
    width: 32px;
    height: 32px;
    border-radius: 100%;
  }

  .nav-height {
    height: 70px;
  }
  .links {
    display: flex;
    align-items: center;
    ul {
      list-style: none;
    }
    .nav-links {
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
