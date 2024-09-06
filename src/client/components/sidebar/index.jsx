import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import { Broadcast, Facility, Lab, Master, Reports, roleIds } from "../../_helpers/constants";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getLoggedInUserRoleId } from "@utils/common";

const drawerWidth = "15.5vw";

function Sidebar(props) {
  const { window, mobileOpen, setMobileOpen } = props;

  // const [mobileOpen, setMobileOpen] = React.useState(true);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const currentRole = userDetails?.roleMasterDTO.roleId;

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 6 || index === 5) {
      setOpenAdmin(true);
      setOpenLab(true);
    }
  };

  const indexToSideBarName = {
    dashboard: 0,
    "tenant-config": 1,
    "master-data": 3,
    broadcast: 4,
    "admin-profile": 5,
    tenantDashboard: 6,
    "tenant-admin-users": 7,
    "tenant-order-reports": 8,
    reconciliation: 9,
    "order-config": 10,
    patientManagement: 11,
    facilities: 12,
    labs: 13,
    "tntAdmin-masterdata": 14,
    compendium: 15
  };

  const usePathname = () => {
    const location = useLocation();

    return location?.pathname?.slice(1).split("/")[0];
  };
  const [selectedIndex, setSelectedIndex] = React.useState(indexToSideBarName[usePathname()] || 0);
  const [openAdmin, setOpenAdmin] = React.useState(true);
  const handleAdminClick = (event) => {
    setOpenAdmin(!openAdmin);
    if (!openLab) {
      setOpenLab(true);
    }
  };
  const [reports, setReports] = useState();
  const featuresJson = sessionStorage.getItem("features");
  const features = featuresJson ? JSON.parse(featuresJson) : null;

  useEffect(() => {
    const featuresJson = sessionStorage.getItem("features");
    const features = featuresJson ? JSON.parse(featuresJson) : null;
    if (features) {
      if (features !== null && features !== undefined && reports === undefined) {
        const Reports = features.find((s) => s.featureName === "Reports");
        setReports(Reports);
      }
    }
  }, [getLoggedInUserRoleId(), features]);

  const [openLab, setOpenLab] = React.useState(true);
  const handleLabClick = () => {
    if (!openAdmin) {
      setOpenAdmin(true);
    }
    setOpenLab(!openLab);
  };
  const drawer = (
    <div className="mobileViewSidenav">
      {currentRole === roleIds.SUPER_ADMIN && (
        <List>
          <ListItem>
            <Link to="/dashboard">
              <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                <ListItemIcon>
                  {selectedIndex === 0 ? (
                    <Typography
                      component="span"
                      variant="span"
                      className="ls-dashboard primaryIcon"
                      fontSize={24}
                    ></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-dashboard secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/tenant-config">
              <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon>
                  {selectedIndex === 1 ? (
                    <Typography component="span" variant="span" className="ls-tenantsMenuIcon primaryIcon"></Typography>
                  ) : (
                    <Typography
                      component="span"
                      variant="span"
                      className="ls-tenantsMenuIcon secondaryIcon"
                    ></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Tenants</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem>
            <Link to="/master-data">
              <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                <ListItemIcon>
                  {selectedIndex === 3 ? (
                    <Typography component="span" variant="span" className="ls-storage primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-storage secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Master Data</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/broadcast">
              <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
                <ListItemIcon>
                  {selectedIndex === 4 ? (
                    <Typography component="span" variant="span" className="ls-broadcast primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-broadcast secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Broadcast</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/admin-profile">
              <ListItemButton selected={selectedIndex === 5} onClick={(event) => handleListItemClick(event, 5)}>
                <ListItemIcon>
                  {selectedIndex === 5 ? (
                    <Typography component="span" variant="span" className="ls-profile primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-profile secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Profile Details</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      )}
      {currentRole === roleIds.TENANT_ADMIN && (
        <List>
          <ListItem>
            <Link to="/tenantDashboard">
              <ListItemButton selected={selectedIndex === 6} onClick={(event) => handleListItemClick(event, 6)}>
                <ListItemIcon>
                  {selectedIndex === 0 ? (
                    <Typography component="span" variant="span" className="ls-dashboard primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-dashboard secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link>
              <ListItemButton
                selected={[4, 7, 8, 9, 10, 11].includes(selectedIndex)}
                onClick={(event) => handleAdminClick()}
              >
                <ListItemIcon>
                  {selectedIndex === 1 ? (
                    <Typography component="span" variant="span" className="ls-administration primaryIcon"></Typography>
                  ) : (
                    <Typography
                      component="span"
                      variant="span"
                      className="ls-administration secondaryIcon"
                    ></Typography>
                  )}
                </ListItemIcon>
                <ListItemText className="lab-manage-text">Administration</ListItemText>
                {openAdmin ? (
                  <Typography
                    variant="span"
                    component="span"
                    className="ls-rightarrow ls-outlined-down-arrow"
                  ></Typography>
                ) : (
                  <Typography
                    variant="span"
                    component="span"
                    className="ls-rightarrow ls-outlined-up-arrow"
                  ></Typography>
                )}
              </ListItemButton>
            </Link>
            <Collapse in={!openAdmin} timeout="auto" unmountOnExit className="collapsable__list">
              <List>
                <ListItem>
                  <Link to="/tenant-admin-users/client-admin">
                    <ListItemButton selected={selectedIndex === 7} onClick={(event) => handleListItemClick(event, 7)}>
                      <ListItemText>Users</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  {reports && (reports?.readInd === true || reports?.createInd === true) && (
                    <Link to="/tenant-order-reports">
                      <ListItemButton selected={selectedIndex === 8} onClick={(event) => handleListItemClick(event, 8)}>
                        <ListItemText className="lab-manage-text">Orders & Results</ListItemText>
                      </ListItemButton>
                    </Link>
                  )}
                </ListItem>
                <ListItem>
                  <Link to="/reconciliation">
                    <ListItemButton selected={selectedIndex === 9} onClick={(event) => handleListItemClick(event, 9)}>
                      <ListItemText>Reconciliation</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/order-config/order-configuration">
                    <ListItemButton selected={selectedIndex === 10} onClick={(event) => handleListItemClick(event, 10)}>
                      <ListItemText className="lab-manage-text">Order Configuration</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  {Broadcast && (Broadcast?.readInd === true || Broadcast?.createInd === true) && (
                    <Link to="/broadcast">
                      <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
                        <ListItemText>Broadcast</ListItemText>
                      </ListItemButton>
                    </Link>
                  )}
                </ListItem>
                <ListItem>
                  <Link to="/patientManagement">
                    <ListItemButton selected={selectedIndex === 11} onClick={(event) => handleListItemClick(event, 11)}>
                      <ListItemText className="lab-manage-text">Patient Management</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
          <ListItem>
            <Link>
              <ListItemButton selected={[12, 13, 14, 15].includes(selectedIndex)} onClick={(event) => handleLabClick()}>
                <ListItemIcon>
                  {selectedIndex === 8 ? (
                    <Typography component="span" variant="span" className="ls-labManagement primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-labManagement secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText className="lab-manage-text">Lab Management</ListItemText>
                {openLab ? (
                  <Typography
                    variant="span"
                    component="span"
                    className="ls-rightarrow ls-outlined-down-arrow"
                  ></Typography>
                ) : (
                  <Typography
                    variant="span"
                    component="span"
                    className="ls-rightarrow ls-outlined-up-arrow"
                  ></Typography>
                )}
              </ListItemButton>
            </Link>
            <Collapse in={!openLab} timeout="auto" unmountOnExit className="collapsable__list">
              <List>
                <ListItem>
                  {Facility && (Facility?.readInd === true || Facility?.createInd === true) && (
                    <Link to="/facilities">
                      <ListItemButton
                        selected={selectedIndex === 12}
                        onClick={(event) => handleListItemClick(event, 12)}
                      >
                        <ListItemText>Facilities</ListItemText>
                      </ListItemButton>
                    </Link>
                  )}
                </ListItem>
                <ListItem>
                  {Lab && (Lab?.readInd === true || Lab?.createInd === true) && (
                    <Link to="/labs">
                      <ListItemButton
                        selected={selectedIndex === 13}
                        onClick={(event) => handleListItemClick(event, 13)}
                      >
                        <ListItemText>Labs</ListItemText>
                      </ListItemButton>
                    </Link>
                  )}
                </ListItem>
                <ListItem>
                  {Master && (Master?.readInd === true || Master?.createInd === true) && (
                    <Link to="/tntAdmin-masterdata/content-management">
                      <ListItemButton
                        selected={selectedIndex === 14}
                        onClick={(event) => handleListItemClick(event, 14)}
                      >
                        <ListItemText>Master Data</ListItemText>
                      </ListItemButton>
                    </Link>
                  )}
                </ListItem>
                <ListItem>
                  <Link to="/compendium">
                    <ListItemButton selected={selectedIndex === 15} onClick={(event) => handleListItemClick(event, 15)}>
                      <ListItemText>Compendiums</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
          <ListItem>
            <Link to="/admin-profile">
              <ListItemButton selected={selectedIndex === 5} onClick={(event) => handleListItemClick(event, 5)}>
                <ListItemIcon>
                  {selectedIndex === 10 ? (
                    <Typography component="span" variant="span" className="ls-profile primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-profile secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Profile Details</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      )}

      {currentRole === roleIds.CLIENT_ADMIN && (
        <List>
          <ListItem>
            <Link to="/clientDashboard">
              <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                <ListItemIcon>
                  {selectedIndex === 0 ? (
                    <Typography component="span" variant="span" className="ls-dashboard primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-dashboard secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/client-admin-users">
              <ListItemButton selected={selectedIndex === 7} onClick={(event) => handleListItemClick(event, 7)}>
                <ListItemIcon>
                  {selectedIndex === 0 ? (
                    <Typography component="span" variant="span" className="ls-users primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-users secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Users</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/tenant-order-reports">
              <ListItemButton selected={selectedIndex === 8} onClick={(event) => handleListItemClick(event, 8)}>
                <ListItemIcon>
                  {selectedIndex === 0 ? (
                    <Typography component="span" variant="span" className="ls-report primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-report secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Orders & Results</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/facilities">
              <ListItemButton selected={selectedIndex === 12} onClick={(event) => handleListItemClick(event, 12)}>
                <ListItemIcon>
                  {selectedIndex === 0 ? (
                    <Typography component="span" variant="span" className="ls-facilities primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-facilities secondaryIcon"></Typography>
                  )}
                </ListItemIcon>

                <ListItemText>Facilities</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/patientManagement">
              <ListItemButton selected={selectedIndex === 11} onClick={(event) => handleListItemClick(event, 11)}>
                <ListItemIcon>
                  {selectedIndex === 0 ? (
                    <Typography
                      component="span"
                      variant="span"
                      className="ls-patientManagment primaryIcon"
                    ></Typography>
                  ) : (
                    <Typography
                      component="span"
                      variant="span"
                      className="ls-patientManagment secondaryIcon"
                    ></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Patient Management</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/admin-profile">
              <ListItemButton selected={selectedIndex === 5} onClick={(event) => handleListItemClick(event, 5)}>
                <ListItemIcon>
                  {selectedIndex === 0 ? (
                    <Typography component="span" variant="span" className="ls-profile primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-profile secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Profile Details</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      )}
      {currentRole === roleIds.PROVIDER && (
        <List>
          <ListItem>
            <Link to="/providerDashboard">
              <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                <ListItemIcon>
                  {selectedIndex === 0 ? (
                    <Typography component="span" variant="span" className="ls-dashboard primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-dashboard secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/tenant-order-reports">
              <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon>
                  {selectedIndex === 1 ? (
                    <Typography component="span" variant="span" className="ls-report primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-report secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Orders & Results</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/patientManagement">
              <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                <ListItemIcon>
                  {selectedIndex === 2 ? (
                    <Typography
                      component="span"
                      variant="span"
                      className="ls-patientManagment primaryIcon"
                    ></Typography>
                  ) : (
                    <Typography
                      component="span"
                      variant="span"
                      className="ls-patientManagment secondaryIcon"
                    ></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Patient Management</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/admin-profile">
              <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                <ListItemIcon>
                  {selectedIndex === 3 ? (
                    <Typography component="span" variant="span" className="ls-profile primaryIcon"></Typography>
                  ) : (
                    <Typography component="span" variant="span" className="ls-profile secondaryIcon"></Typography>
                  )}
                </ListItemIcon>
                <ListItemText>Profile Details</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      )}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="Navigation"
      className="sidebar__wrapper"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box" }
        }}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
