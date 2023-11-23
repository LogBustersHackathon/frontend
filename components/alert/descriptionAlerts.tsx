"use client";
import { useState } from "react";
import {
  Alert,
  AlertColor,
  Badge,
  Box,
  IconButton,
  Popper,
  Fade,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Stack,
} from "@mui/material";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import CheckIcon from "@mui/icons-material/Check";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { toast, TypeOptions } from "react-toastify";
import styles from "./DescriptionAlerts.module.css";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
const types = ["success", "info", "warning", "error"];

export const DescriptionAlerts = ({
  setId,
  setIsChatbotOpen,
  setShowDetails,
}: any) => {
  const { notifications, clear, markAllAsRead, markAsRead, unreadCount } =
    useNotificationCenter();
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const addNotification = () => {
    // use a random type of notification
    toast("Lorem ipsum dolor sit amet, consectetur adipiscing elit", {
      type: types[Math.floor(Math.random() * types.length)] as TypeOptions,
    });
  };

  const toggleNotificationCenter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const toggleFilter = (e: React.ChangeEvent) => {
    setShowUnreadOnly(!showUnreadOnly);
  };

  return (
    <div>
      <div className={styles.buttons}>
        <IconButton
          size="large"
          onClick={toggleNotificationCenter}
          className={styles.notificationsCenterButton}
        >
          <NotificationsOutlinedIcon />
          <Badge
            badgeContent={unreadCount}
            color="primary"
            className={styles.badge}
          ></Badge>
        </IconButton>
        <button className={styles.addButton} onClick={addNotification}>
          Add notification
        </button>
      </div>
      <Popper
        className={styles.popper}
        open={isOpen}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>
              <Box
                sx={{
                  background: "#666",
                  padding: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" color="black">
                  Notification center
                </Typography>
                <FormGroup sx={{ color: "black" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        onChange={toggleFilter}
                        checked={showUnreadOnly}
                      />
                    }
                    label="Show unread only"
                  />
                </FormGroup>
              </Box>
              <Stack
                sx={{
                  height: "400px",
                  width: "min(60ch, 100ch)",
                  padding: "12px",
                  background: "#f1f1f1",
                  borderRadius: "8px",
                  overflowY: "auto",
                  color: "black",
                }}
                spacing={2}
              >
                {(!notifications.length ||
                  (unreadCount === 0 && showUnreadOnly)) && (
                  <h4>
                    Your queue is empty! you are all set{" "}
                    <span role="img" aria-label="dunno what to put">
                      🎉
                    </span>
                  </h4>
                )}
                {(showUnreadOnly
                  ? notifications.filter((v) => !v.read)
                  : notifications
                ).map((notification) => {
                  return (
                    <Alert
                      severity={(notification.type as AlertColor) || "info"}
                      action={
                        notification.read ? (
                          <div>
                            <Button
                              className={styles.showDetailButton}
                              size="small"
                              onClick={() => {
                                setId(notification.id);
                                setIsChatbotOpen(true);
                                setShowDetails(true);
                              }}
                            >
                              Show Detail
                            </Button>
                            <CheckIcon />
                          </div>
                        ) : (
                          <div>
                            <Button
                              className={styles.showDetailButton}
                              size="small"
                              onClick={() => {
                                console.log(notification.id);
                                setIsChatbotOpen(true);
                                setShowDetails(true);
                              }}
                            >
                              Show Detail
                            </Button>
                            <IconButton
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <MarkChatReadIcon />
                            </IconButton>
                          </div>
                        )
                      }
                    >
                      {notification.content as any}
                    </Alert>
                  );
                })}
              </Stack>
              <Box
                sx={{
                  background: "#666",
                  padding: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button variant="contained" onClick={clear}>
                  Clear All
                </Button>

                <Button variant="contained" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
};
