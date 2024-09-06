import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Badge, CssBaseline } from "@mui/material";
import LogoutDialog from "./log-out-confirmation";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Profile from "../../assets/images/ls_svg/Profile.svg";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import auth0 from "auth0-js";
import { getConfig } from "@utils/config";
import { getLoggedInUserRoleId } from "../../utils/common";
import { getLogoname } from "@utils/common";
import { jwtDecode } from "jwt-decode";
import notifyIcon from "@assets/images/ls_svg/Notificationbell.svg";
import { roleIds } from "../../_helpers/constants";
import signoutIcon from "@assets/images/svg/signout.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

function Header({ setMobileOpen, mobileOpen }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const notificationFlag = JSON.parse(sessionStorage.getItem("notificationFlag"));
  const settings =
    userDetails?.roleMasterDTO?.roleId === roleIds.PATIENT
      ? [
          {
            name: "My Profile",
            icon: Profile
          },
          {
            name: "Sign-Out",
            icon: signoutIcon
          }
        ]
      : [
          {
            name: "Sign-Out",
            icon: signoutIcon
          }
        ];
  const { logout } = useAuth0();
  const config = getConfig();
  const navigate = useNavigate();
  const firstReloadAvailable = localStorage.getItem("firstLoad");
  if (!firstReloadAvailable) {
    localStorage.setItem("firstLoad", true);
    localStorage.setItem("featuresReload", true);
    window.location.reload();
  }
  const { pathname } = useLocation();
  setInterval(() => {
    checkLogin();
  }, 10000);
  const webAuth = new auth0.WebAuth({
    domain: config.domain,
    clientID: config.clientId,
    audience: config.audience
  });
  const checkLogin = (e) => {
    if (sessionStorage.getItem("authInfo")) {
      const currentTime = new Date().valueOf();
      const authInfo = JSON.parse(sessionStorage.getItem("authInfo"));
      const decodedToken = jwtDecode(authInfo.accessToken);
      const tokenExpTime = new Date(decodedToken.exp * 1000).valueOf();
      if (tokenExpTime - 600000 <= currentTime) {
        webAuth.checkSession(
          {
            responseType: "token id_token",
            redirectUri: "http://dev.localhost:8080/home",
            audience: config.audience,
            scope: "read:order write:order"
          },
          (err, authResult) => {
            sessionStorage.setItem("authInfo", JSON.stringify(authResult));
            console.log(err, authResult);
          }
        );
      }
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (setting) => {
    if (userDetails?.roleMasterDTO?.roleId === roleIds.PATIENT) {
      if (setting === settings[1].name) setOpen(true);
      else if (setting === settings[0].name) navigate("admin-profile");
    } else {
      if (setting === settings[0].name) setOpen(true);
    }
    setAnchorElUser(!anchorElUser);
  };

  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const handleHamburgerClick = (event) => {
    setIsHamburgerActive((current) => !current);
  };
  const firstNameInitial = userDetails?.firstName ? Array.from(userDetails.firstName)[0] : "";
  const lastNameInitial = userDetails?.lastName ? Array.from(userDetails.lastName)[0] : "";
  const redirectToNotificationPage = () => {
    navigate("/notification");
  };
  const { notificationList: data } = useSelector((state) => state.NOTIFICATIONLIST);

  return (
    <Box
      className={
        isHamburgerActive
          ? "header__wrapper header__wrapper--admin activeHamburger-menu"
          : "header__wrapper header__wrapper--admin"
      }
    >
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="false">
          <Toolbar disableGutters className="d-flex justify-content-between align-items-center">
            {/* <Button onClick={() => setMobileOpen(!mobileOpen)}>
              <Avatar alt="My profile" className="myprofile_icon" src={signoutIcon} />
            </Button> */}
            <Typography componant="div">
              <img
                src={getLogoname()}
                alt="Logo"
                className={getLoggedInUserRoleId() === roleIds.PATIENT ? "logo-icon patient-logo" : "logo-icon"}
              />
              <Typography
                sx={{ display: { md: "none", lg: "none", sm: "none" } }}
                component="span"
                variant="span"
                className="primaryIcon collapsibleMenu ls-hamburger-menu"
                onClick={() => setMobileOpen(!mobileOpen)}
              ></Typography>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} className="menu_wrapper">
              {userDetails?.roleMasterDTO?.roleId === roleIds.PATIENT && (
                <>
                  <Link to="/home">
                    <Button className="menu_items">Home</Button>
                  </Link>
                </>
              )}
            </Box>
            <Box sx={{ flexGrow: 0 }} display="flex" alignItems="center" className="headerRightSection">
              {getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN && notificationFlag ?  (
              <div className="me-5 notifyImage" onClick={redirectToNotificationPage}>
                <Badge color="secondary" badgeContent={data?.totalCount} max={99} showZero>
                  <img src={notifyIcon} className="" />
                </Badge>
              </div>
              ): getLoggedInUserRoleId() !== roleIds.CLIENT_ADMIN && ( <div className="me-5 notifyImage" onClick={redirectToNotificationPage}>
              <Badge color="secondary" badgeContent={data?.totalCount} max={99} showZero>
                <img src={notifyIcon} className="" />
              </Badge>
            </div>)}
              <Typography variant="h6" className="profile_name">
                {`${userDetails?.firstName} ${userDetails?.lastName}`}
                <br />
                <Typography variant="span" component="span" className="role_name">
                  {`${userDetails?.roleMasterDTO?.roleName}`}
                </Typography>
              </Typography>
              <Typography component="div" variant="div" className="profilePicHeader profilePic">
                <Typography component="h6" variant="h6">
                  {`${firstNameInitial}${lastNameInitial}`}
                </Typography>
              </Typography>
              <Typography
                variant="span"
                component="span"
                onClick={handleOpenUserMenu}
                className="ls-rightarrow ls-outlined-down-arrow"
              ></Typography>
              <Menu
                className="header_dropdown mt-5"
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={() => handleCloseUserMenu(setting.name)}>
                    <Avatar alt="My profile" className="myprofile_icon" src={setting.icon} />
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {open && <LogoutDialog open={open} setOpen={setOpen} />}
    </Box>
  );
}
export default Header;
