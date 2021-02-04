import React, { useState } from 'react'
import { Link } from "react-router-dom";

//Components
import LoginForm from "./LoginForm";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// @material-ui/core components
import { Modal, Backdrop, Fade } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//for Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Header(props) {

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("CLOSE");
    setOpen(false);
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const classes = useStyles();

  return (
    <div>
      <header className="landing-header">
      <Link to="/">
        <div className="logo-container">
          <img src="https://i.imgur.com/j6IJGS2.png" alt="logo" />
          <h4 className="logo">Cup<span>O</span>Sugah</h4>
        </div>
        </Link>
        <nav>
          <ul className="nav-links">
            <li>
            <Link className="nav-link" to="/about">
                About
            </Link>
            </li>
            <li>
            <Link className="nav-link" to="/team">
                Team
            </Link>
            </li>
          </ul>
        </nav>
        <div className="dropdown-mobile">
              <Dropdown
                isOpen={dropdownOpen}
                toggle={toggle}
                className="user-dropdown-toggle-show"
              >
                <DropdownToggle>
                  <i className="fa fa-chevron-down"></i>
                  {/* <i className="fa fa-bars"></i> */}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>
                  </DropdownItem>
                  <Link to="/team">
                    <DropdownItem>
                     Team
                    </DropdownItem>
                  </Link>
                  <Link to="/about">
                  <DropdownItem>
                    About
                  </DropdownItem>
                  </Link>
                </DropdownMenu>
              </Dropdown>
            </div>
        <div className="login-container">
          <Button
            className="login-button"
            variant="warning"
            onClick={handleOpen}
          >
            LOG IN
          </Button>
        </div>
      </header>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div>
            <LoginForm handleClose={handleClose} login={props.login} />
          </div>
        </Fade>
      </Modal>
      
    </div>
  )
}

export default Header
