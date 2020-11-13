import React, { useState } from "react";
import "../../styles.scss";
import { Link, NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ErrorIcon from '@material-ui/icons/Error';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHelping,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

function Nav(props) {
  const [landingRedirect, setlandingRedirect] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleUserDropdown = () =>
    setUserDropdownOpen((prevState) => !prevState);
  const [messageNotification, setMessageNotification] = useState(true);

  const removeNotification = () => {
    setMessageNotification(false);
  };

  const logout = () => {
    axios.post("/users/logout").then((response) => {
      setTimeout(() => {
        setlandingRedirect(true);
        props.logout({});
      }, 800);
    });
  };

  if (landingRedirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="nav-bar">
      <div className="left-side-nav">
        <NavLink to="/home" className="home-link">
        <div className="logo-container">
          <img src="https://i.imgur.com/j6IJGS2.png" alt="logo" />
          <h4 className="logo">Cup<span>O</span>Sugah</h4>
        </div>
        </NavLink>
        <div className="menu-dropdown">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle>
              Menu <i className="fa fa-chevron-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              <NavLink to="/home">
                <DropdownItem>
                  {" "}
                  <div className="button-layout exit">
                    <HomeIcon className="icon " />
                    <div> Home</div>{" "}
                  </div>
                </DropdownItem>
              </NavLink>{" "}
              <NavLink to="/map">
                <DropdownItem>
                  {" "}
                  <div className="button-layout exit">
                    <FontAwesomeIcon
                      icon={faMapMarkedAlt}
                      className="icon-fa "
                    />
                    <div> Map</div>
                  </div>
                </DropdownItem>
              </NavLink>
              <NavLink to="/events">
                <DropdownItem>
                  {" "}
                  <div className="button-layout exit">
                    <DateRangeIcon className="icon " />
                    <div> Events</div>{" "}
                  </div>
                </DropdownItem>
              </NavLink>
              <NavLink to="/services">
                <DropdownItem>
                  {" "}
                  <div className="button-layout exit">
                    <FontAwesomeIcon
                      icon={faHandsHelping}
                      className="icon-fa "
                    />
                    <div> Services</div>
                  </div>
                </DropdownItem>
              </NavLink>
              <NavLink to="/alerts">
                <DropdownItem>
                  {" "}
                  <div className="button-layout exit">
                    <ErrorIcon className="icon " />
                    <div> Alerts</div>{" "}
                  </div>
                </DropdownItem>
              </NavLink>
            </DropdownMenu>
          </Dropdown>
        </div>
        
      </div>

      <div className="right-side-nav">
        {props.user === undefined ? (
          <Link className="link-style" to="/Login">
            Login
          </Link>
        ) : (
          <div className="right-side-nav">
            
            <div className="user-info-nav">
              <img src={props.user.profile_photo} alt="profile" />
              <h3>
                {props.user.first_name} {props.user.last_name}
              </h3>
            </div>
            <div className="message-icon">
              {messageNotification === true ? (
                <div className="message-icon-text">
                  <i className="fa fa-exclamation"></i>
                </div>
              ) : (
                <div className="no-message-icon-text"></div>
              )}
              <Link className="link-style" to="/Messages">
                <FontAwesomeIcon
                  icon={faComment}
                  className="icon-fa"
                  onClick={removeNotification}
                />
                {/* <img src="./images/messages.png" alt="messages" onClick={removeNotification}/> */}
              </Link>
            </div>
            <div className="user-dropdown">
              <Dropdown
                isOpen={userDropdownOpen}
                toggle={toggleUserDropdown}
                className="user-dropdown-toggle-show"
              >
                <DropdownToggle>
                  <i className="fa fa-chevron-down"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>
                    <figure className="user-dropdown-figure">
                      <img src={props.user.profile_photo} alt="profile" />
                      {props.user.first_name} {props.user.last_name}
                    </figure>
                    <DropdownItem divider />
                  </DropdownItem>
                  <NavLink to="/account">
                    <DropdownItem>
                      <div className="button-layout">
                        <SettingsIcon className="icon" />
                        <div> Settings</div>
                      </div>
                    </DropdownItem>
                  </NavLink>
                  <DropdownItem>
                    <span onClick={logout}>
                      <div className="button-layout exit">
                        <img src="./images/logout.svg" alt="logout" className="icon" />
                        <div> Sign out</div>
                      </div>
                    </span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
        <div className="menu-dropdown-mobile">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle>
              <i className="fa fa-bars"></i>
            </DropdownToggle>
            <DropdownMenu>
              <NavLink to="/home">
                <DropdownItem>
                  {" "}
                  <div className="button-layout exit">
                    <HomeIcon className="icon " />
                    <div> Home</div>{" "}
                  </div>
                </DropdownItem>
              </NavLink>
              <NavLink to="/map">
                <DropdownItem>
                  {" "}
                  <div className="button-layout exit">
                    <FontAwesomeIcon
                      icon={faMapMarkedAlt}
                      className="icon-fa "
                    />
                    <div> Map</div>
                  </div>
                </DropdownItem>
              </NavLink>
              <NavLink to="/events">
                <DropdownItem>
                  {" "}
                  <div className="button-layout exit">
                    <DateRangeIcon className="icon " />
                    <div> Events</div>{" "}
                  </div>
                </DropdownItem>
              </NavLink>
              <NavLink to="/services">
                <DropdownItem>
                  {" "}
                  <div className="button-layout exit">
                    <FontAwesomeIcon
                      icon={faHandsHelping}
                      className="icon-fa "
                    />
                    <div> Services</div>
                  </div>
                </DropdownItem>
              </NavLink>
              <NavLink to="/alerts">
                <DropdownItem>
                  {" "}
                  <div className="button-layout exit">
                    <ErrorIcon  className="icon " />
                    <div> Alerts</div>{" "}
                  </div>
                </DropdownItem>
              </NavLink>

              <NavLink to="/messages">
                <DropdownItem>
                  {" "}
                  <div className="button-layout exit">
                    <FontAwesomeIcon icon={faComment} className="icon-fa " />
                    <div> Messages</div>
                  </div>
                </DropdownItem>
              </NavLink>
              <NavLink to="/account">
                <DropdownItem>
                  {" "}
                  <div className="button-layout">
                    <SettingsIcon className="icon" />
                    <div> Settings</div>
                  </div>
                </DropdownItem>
              </NavLink>
              <DropdownItem>
                <span onClick={logout}>
                  <div className="button-layout exit">
                    <ExitToAppIcon className="icon " />
                    <div> Sign out</div>
                  </div>
                </span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
