import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { PostAdd, VideoLibrary } from '@mui/icons-material';
import { FaCog, FaUserCircle, FaInfoCircle, FaBalanceScale, FaLock } from 'react-icons/fa';
import profile from '../assets/profile.png';
import { MdImage } from 'react-icons/md';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaDonate, FaHandHoldingHeart } from 'react-icons/fa';
const Container = styled.div`
  
  .active {
    border-right: 4px solid var(--white);
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`;

const Button = styled.button`
  background-color: var(--black);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before,
  &::after {
    content: "";
    background-color: var(--white);
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }
  &::before {
    top: ${(props) => (props.clicked ? '1.5' : '1rem')};
    transform: ${(props) => (props.clicked ? 'rotate(135deg)' : 'rotate(0)')};
  }
  &::after {
    top: ${(props) => (props.clicked ? '1.2' : '1.5rem')};
    transform: ${(props) => (props.clicked ? 'rotate(-135deg)' : 'rotate(0)')};
  }
`;

const SidebarContainer = styled.div`
  background-color: var(--black);
  width: 3.5rem;
  height: 100vh;
  margin-top: ${(props) => (props.clicked ? '6rem' : '0rem')}; /* Adjusted margin-top */
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  over-flow:scroll;
`;

const Logo = styled.div`
  width: 2rem;
  color: var(--white);
  svg {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  color: var(--white);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);
  padding: 2rem 0;
  position: absolute;
  top: 2.8rem;
  left: 0;
  width: ${(props) => (props.clicked ? '12rem' : '3.5rem')};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled.a`
  text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 0.5rem 0;
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  &:hover {
    border-right: 4px solid var(--white);
    .svg {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
  svg {
    width: 1.2rem;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;



const Profile = styled.div`
  width: ${(props) => (props.clicked ? '14rem' : '3rem')};
  height: 3rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? '9rem' : '0')};
  background-color: var(--black);
  color: var(--white);
  transition: all 0.3s ease;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
  }
`;

const Details = styled.div`
  display: ${(props) => (props.clicked ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.span`
  width: ${(props) => (props.clicked ? '100%' : '0')};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? '1.0rem' : '0')};
  transition: all 0.3s ease;
  font-size: 15px; /* Set the font size */
`;

const Name = styled.div`
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h5 {
    display: inline-block;
    font-size: 28px; /* Set the font size */
  }
  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: var(--grey);
    &:hover {
      text-decoration: underline;
    }
  }
`;


const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  svg {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`;
const SubMenuWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ddd;
    border-radius: 4px;
  }
`

const SubMenu = styled.div`
  display: ${(props) => (props.clicked ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-left: 0.0rem;
`;
const CustomScrollbar = styled.div`
  position: relative;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ddd;
    border-radius: 4px;
  }
`;

const Sidebar = ({ onLogout }) => {
  const [click, setClick] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [profileClick, setProfileClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
    setShowSubMenu(false); // Hide the submenu when clicking on other items
  };
  const handleSubMenuClick = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleProfileClick = () => setProfileClick(!profileClick);
  return (
    <Container>
      <Button clicked={click} onClick={() => handleClick()}>
        Click
      </Button>
      <SidebarContainer>
        <Logo>
          <h2>MA</h2>
        </Logo>
        <SlickBar clicked={click}>
          <Link to="/textpost" style={{ listStyle: 'none', margin: '0', padding: '0', textDecoration: 'none' }}>
            <Item onClick={() => setClick(false)} exact activeClassName="active" to="/text">

              <PostAdd style={{ color: '#333' }} />
              <Text clicked={click}>Add Text  </Text>
            </Item>
          </Link>


          {/* <Link to="/imagepost" style={{ listStyle: 'none', margin: '0', padding: '0', textDecoration: 'none' }}>
            <Item onClick={() => setClick(false)} activeClassName="active" to="/imagepost">

              <MdImage style={{ color: '#333' }} />
              <Text clicked={click}>Add Img</Text>
            </Item>
          </Link> */}
          <Link to="/videopost" style={{ listStyle: 'none', margin: '0', padding: '0', textDecoration: 'none' }}>
            <Item onClick={() => setClick(false)} activeClassName="active" to="/post">

              <VideoLibrary style={{ color: '#333' }} />
              <Text clicked={click}>Add Video</Text>
            </Item>
          </Link>
          <Item onClick={handleSubMenuClick} style={{ marginLeft: "20px" }}>
            <FaCog color="#333" /> {/* Settings icon */}
            <Text clicked={click}>Setting</Text>
          </Item>
          <SubMenuWrapper>
            <CustomScrollbar>
              <SubMenu clicked={click && showSubMenu}>
                <Link to="/aboutus" style={{ listStyle: 'none', margin: '0', padding: '0', textDecoration: 'none' }}>
                  <Item onClick={() => setClick(false)} to="/about-us">
                    <FaInfoCircle size={24} color="#333" /> {/* About Us icon */}
                    <Text clicked={click}>About Us</Text>
                  </Item>
                </Link>

                <Link to="/termsandcondition" style={{ listStyle: 'none', margin: '0', padding: '0', textDecoration: 'none' }}>
                  <Item onClick={() => setClick(false)} to="/terms-and-conditions">
                    <FaBalanceScale size={24} color="#333" /> {/* Terms and Conditions icon */}
                    <Text clicked={click}>Terms and Conditions</Text>
                  </Item>
                </Link>


                <Link to="/privacypolicy" style={{ listStyle: 'none', margin: '0', padding: '0', textDecoration: 'none' }}>
                  <Item onClick={() => setClick(false)} to="/privacy-policy">
                    <FaLock size={24} color="#333" /> {/* Privacy Policy icon */}
                    <Text clicked={click}>Privacy Policy</Text>
                  </Item>
                </Link>
              </SubMenu>
            </CustomScrollbar>
          </SubMenuWrapper>

          <Link to="/donation" style={{ listStyle: 'none', margin: '0', padding: '0', textDecoration: 'none' }}>
            <Item onClick={() => setClick(false)} exact activeClassName="active" to="/text">

              <FaDonate color="#333" size={32} />
              <Text clicked={click}> Donation  </Text>
            </Item>
          </Link>
          <Link to="/request" style={{ listStyle: 'none', margin: '0', padding: '0', textDecoration: 'none' }}>
            <Item onClick={() => setClick(false)} exact activeClassName="active" to="/request">

              <FaHandHoldingHeart size={50} color="#333" />
              <Text clicked={click}> Request  </Text>
            </Item>
          </Link>


          <Link to="/" style={{ listStyle: 'none', margin: '0', padding: '0', textDecoration: 'none' }}>
            <Item onClick={() => onLogout()} activeClassName="active" to="/projects">
              <AiOutlineLogout size={32} color="#333" />
              <Text clicked={click}>Logout</Text>
            </Item>
          </Link>
        </SlickBar>

        <Profile clicked={profileClick}>
          <img onClick={() => handleProfileClick()} src={profile} alt="profile pic" />
          <Details clicked={profileClick}>
            <Name>
              <h4>M Areeb</h4>
            </Name>

            <Logout onClick={() => onLogout()}>
              <svg viewBox="0 0 512 512" width="100" title="power-off">
                <path d="M400 54.1c63 45 104 118.6 104 201.9 0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4 7.9 173.1 48.9 99.3 111.8 54.2c11.7-8.3 28-4.8 35 7.7L162.6 90c5.9 10.5 3.1 23.8-6.6 31-41.5 30.8-68 79.6-68 134.9-.1 92.3 74.5 168.1 168 168.1 91.6 0 168.6-74.2 168-169.1-.3-51.8-24.7-101.8-68.1-134-9.7-7.2-12.4-20.5-6.5-30.9l15.8-28.1c7-12.4 23.2-16.1 34.8-7.8zM296 264V24c0-13.3-10.7-24-24-24h-32c-13.3 0-24 10.7-24 24v240c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24z" />
              </svg>
            </Logout>
          </Details>
        </Profile>
      </SidebarContainer>
    </Container>
  );
};

export default Sidebar;
