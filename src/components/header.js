import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import boardgametrackerlogo from "../images/boardgametrackerlogo.PNG";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: white;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  color: white;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  &:hover {
    background-color: #555;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      {/* This redirects back to the home page */}
      <Logo to="/">
      {/* <img src={boardgametrackerlogo} alt="" /> */}

      {/* 3rd party image hosting */}
      <img src="https://res.cloudinary.com/datgtai6b/image/upload/v1705210596/artistic-alley-uploads/boardgametrackerlogo_uyf01v.png"/>
      {/* <img src="https://ibb.co/8sB25wX" alt="" />
      <img src="https://postimg.cc/67XpZLTX" alt="" /> */}
      </Logo>
      <Nav>
        <NavLink to="/manage-inventory"><b>Manage Inventory</b></NavLink>
        <NavLink to="/generate-report"><b>Generate Report</b></NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
