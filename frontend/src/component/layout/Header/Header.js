import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import logo from "../../../images/logo.png";

import {
  AccountBox,
  AddBusiness,
  Close,
  DensityMedium,
  Email,
  HelpCenter,
  Home,
  ListAlt,
  Login,
  Logout,
  ShoppingCart,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import { useAlert } from "react-alert";

export const Header = () => {
  const options = [
    { text: "Home", icon: <Home />, link: "/" },
    { text: "Products", icon: <AddBusiness />, link: "/products" },
    { text: "Cart", icon: <ShoppingCart />, link: "/cart" },
    { text: "Orders", icon: <ListAlt />, link: "/orders" },
    { text: 'Profile', icon: <AccountBox />, link: '/account' },
    { text: "About", icon: <HelpCenter />, link: "/about" },
    { text: "Contact", icon: <Email />, link: "/contact" },
    { text: 'Logout', icon: <Logout />, link: '/login', func:logoutUser }
  ];

  const [open, setOpen] = useState(open);
  const dispatch = useDispatch()
  const alert = useAlert()

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <div className="headerTop">
        <img style={{ width: "185px" }} src={logo} alt="Ecommerce" />
        <Button onClick={toggleDrawer()}>
          <Close style={{ fontSize: "30px" }} />
        </Button>
      </div>
      <div className="headerLinkBox">
        {options.map((option, index) => (
          <div onClick={option.func} key={index}>
            <Link to={option.link}>
              <div>
                {option.icon}
                <span>{option.text}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Box>
  );

  return (
    <div>
      <Fragment>
        <Button
          style={{ position: "fixed", top: "2%", left: "1%", zIndex: "10" }}
          onClick={toggleDrawer()}
        >
          <DensityMedium style={{ fontSize: "40px", fontWeight: "800" }} />
        </Button>
        <Drawer anchor="left" open={open} onClose={toggleDrawer()}>
          {list()}
        </Drawer>
      </Fragment>
    </div>
  );
};
