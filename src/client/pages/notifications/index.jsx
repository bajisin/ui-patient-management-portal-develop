import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import { getNotificationList } from "@redux/slices/notificationListSlice";
import moment from "moment";
import { roleIds } from "../../_helpers/constants";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  // const [notifications, setNotifications] = useState([]);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD") // Format as YYYY-MM-DD
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD")); // Format as YYYY-MM-DD
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notificationList: data } = useSelector((state) => state.NOTIFICATIONLIST);
  const notificationFlag = JSON.parse(sessionStorage.getItem("userDetails"))?.notificationFlag;

  useEffect(() => {
    dispatch(
      getNotificationList({
        pageNo: 0,
        pageSize: 5,
        createdBy: getLoggedInUserId(),
        lableId: getLoggedInUserRoleId(),
        notifCtgyId: null,
        notifTypeId: getLoggedInUserRoleId() === roleIds.PATIENT ? 1 : null,
        sortBy: "",
        searchValue: "",
        sortKey: "lastModifiedDate",
        sortOrder: "DESC"
        // startDate:
        //   getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
        //     ? ""
        //     : startDate,
        // endDate:
        //   getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
        //     ? ""
        //     : endDate
      })
    );
  }, []);
  const redirectToNotificationPage = () => {
    navigate("/notification");
  };
  return (
    <>
      {notificationFlag && (
        <Box className="notification__section basic__card mb-3">
          <Box className="title__wrapper align-items-end">
            <Box className="title__wrapper--left">
              <Typography variant="h5" component="h5" className="section_title">
                Notifications
                <Typography component="span" variant="span" className="notifyCount">
                  {/* 02 */}
                  {data?.totalCount}
                </Typography>
              </Typography>
              <Typography variant="span" component="span" className="overview_text">
                {/* View all your recent notifications */}
                Get an overview of all the notifications
              </Typography>
            </Box>
            {data?.totalCount !== 0 && (
              <Box className="title__wrapper--right">
                <Typography className="title_right cursor-pointer" onClick={redirectToNotificationPage}>
                  View All
                </Typography>
              </Box>
            )}
          </Box>

          <List className="notification_list">
            {data?.data?.map((note, i) => {
              const date = note?.updatedDate.split("T")[0];
              const [year, month, day] = date.split("-");
              const formattedDate = `${month}-${day}-${year}`;
              return (
                <ListItem alignItems="flex-start" className="list_item" key={i}>
                  <ListItemText
                    primary={note?.notificationMsg}
                    secondary={
                      <Box className="list_wrap">
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          className="list_date d-inline"
                        >
                          {formattedDate} {note?.updatedDate.split("T")[1].substring(0, 5)}{" "}
                          {/* Use formattedDate here */}
                        </Typography>
                        {note?.category?.id === 1 ? (
                          <Typography className="view_details">View Details</Typography>
                        ) : (
                          note?.category?.id === 2 && <Typography className="view_details">View Reports</Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              );
            })}
            {/* <ListItem alignItems="flex-start" className="list_item">
          <Typography className="bullets"></Typography>
          <ListItemText
            primary={"Your test results from Lifescan laboratories by Dr. Albert are available"}
            secondary={
              <Box className="list_wrap">
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  className="list_date"
                >
                  Today at 9:42 AM
                </Typography>
                <Typography className="view_details">View Details</Typography>
              </Box>
            }
          />
        </ListItem>
        <Divider className="list_divider" variant="inset" component="li" />
        <ListItem alignItems="flex-start" className="list_item">
          <Typography className="bullets"></Typography>
          <ListItemText
            primary={"Your test results from Lifescan laboratories by Dr. Albert are available"}
            secondary={
              <Box className="list_wrap">
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                  className="list_date"
                >
                  Today at 9:42 AM
                </Typography>
                <Typography className="view_details">View Details</Typography>
              </Box>
            }
          />
        </ListItem>
        <Divider className="list_divider" variant="inset" component="li" /> */}
          </List>
        </Box>
      )}
    </>
  );
}
