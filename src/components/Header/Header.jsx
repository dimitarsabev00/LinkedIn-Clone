/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import HeaderLogo from "../../assets/icons/header-logo.svg";
import SearchingIcon from "../../assets/icons/search-icon.svg";
import NavHomeIcon from "../../assets/icons/nav-home.svg";
import NavNetworkIcon from "../../assets/icons/nav-network.svg";
import NavJobsIcon from "../../assets/icons/nav-jobs.svg";
import NavMessagingIcon from "../../assets/icons/nav-messaging.svg";
import NavNotificationsIcon from "../../assets/icons/nav-notifications.svg";
import ArrowDownIcon from "../../assets/icons/arrow-down-icon.svg";
import NavWorkIcon from "../../assets/icons/nav-work.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ProfilePopup from "../ProfilePopup";
import { useEffect } from "react";
import { getAllUsers } from "../../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(({ generalSlice }) => generalSlice.user);
  const [popupVisible, setPopupVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };
  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const allUsers = useSelector(({ generalSlice }) => generalSlice.allUsers);
  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = allUsers.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(allUsers);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 10);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  return (
    <Container>
      <Content>
        {popupVisible ? (
          <PopupPositionContainer>
            <ProfilePopup />
          </PopupPositionContainer>
        ) : (
          <></>
        )}
        <Logo
          onClick={() => {
            navigate("/feed");
          }}
        >
          <img src={HeaderLogo} alt="" />
        </Logo>
        <Search>
          <div>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
            />
          </div>
          <SearchIcon>
            <img src={SearchingIcon} alt="" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList
              className="active"
              onClick={() => {
                navigate("/feed");
              }}
            >
              <a>
                <img src={NavHomeIcon} alt="" />
                <span>Home</span>
              </a>
            </NavList>

            <NavList
              onClick={() => {
                navigate("/connections");
              }}
            >
              <a>
                <img src={NavNetworkIcon} alt="" />
                <span>My Network</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src={NavJobsIcon} alt="" />
                <span>Jobs</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src={NavMessagingIcon} alt="" />
                <span>Messaging</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src={NavNotificationsIcon} alt="" />
                <span>Notifications</span>
              </a>
            </NavList>

            <User onClick={displayPopup}>
              <a>
                {currentUser?.[0]?.avatar && (
                  <img src={currentUser?.[0]?.avatar} alt="user" />
                )}
                <span>
                  <span>Me</span>
                  <img src={ArrowDownIcon} alt="" />
                </span>
              </a>
            </User>

            <Work>
              <a>
                <img src={NavWorkIcon} alt="" />
                <span>
                  Work
                  <img src={ArrowDownIcon} alt="" />
                </span>
              </a>
            </Work>
            {searchInput.length === 0 ? (
              <></>
            ) : (
              <SearchResultWrapper>
                {filteredUsers.length === 0 ? (
                  <div className="search-inner">No Results Found..</div>
                ) : (
                  filteredUsers.map((user) => (
                    <div
                      key={user?.id}
                      className="search-inner"
                      onClick={() => openUser(user)}
                    >
                      <img src={user?.avatar} />
                      <p className="name">{user?.name}</p>
                    </div>
                  ))
                )}
              </SearchResultWrapper>
            )}
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
  position: relative;
`;

const Logo = styled.div`
  margin-right: 8px;
  font-size: 0px;
  cursor: pointer;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
      outline: none;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;

  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;

    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }

    @media (max-width: 768px) {
      min-width: 70px;
    }
  }

  &:hover,
  &:active {
    a {
      cursor: pointer;
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const User = styled(NavList)`
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;
const PopupPositionContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 65px;
  z-index: 99;
`;
const SearchResultWrapper = styled.div`
  position: absolute;
  left: 40px;
  top: 60px;
  width: 270px;
  height: auto;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #bbbbbb;

  .search-inner {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .name {
      font-family: system-ui;
      font-size: 18px;
    }
  }

  .search-inner:hover {
    background-color: #bbbbbb;
  }
`;

export default Header;
