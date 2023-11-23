"use client";

import { useEffect, useState } from "react";
import { ChatbotWidget } from "../components/ChatbotWidget/ChatbotWidget";
import styles from "./page.module.css";
import Icon from "./avatar/SVG/avatar.svg";

import { subscribeToSubject } from "../wsConnection/natsConnection";

import { ToastContainer } from "react-toastify";
import { StyledEngineProvider } from "@mui/material/styles";
import "react-toastify/ReactToastify.min.css";
import DescriptionAlerts from "@/components/alert/descriptionAlerts";
import { createToastMessage } from "@/components/alert/utils";
import { IconButton } from "@mui/material";
export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);

  console.log("alerts", alerts);

  const toggleChatbot = () => {
    setIsChatbotOpen((isChatbotOpen) => !isChatbotOpen);
  };
  useEffect(() => {
    let unsubscribe: () => void;

    const initSubscription = async () => {
      try {
        unsubscribe = await subscribeToSubject("alarms", (message: string) => {
          setAlerts((currentAlerts) => [...currentAlerts, message]);
        });
      } catch (error) {
        console.error("Subscription error:", error);
      }
    };

    initSubscription();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <main className={styles.main}>
        <div className={styles.center}></div>
        <button
          className={styles.addButton}
          onClick={() =>
            createToastMessage([
              { type: "success", message: "hello" },
              { type: "error", message: "world" },
            ])
          }
        >
          Toast
        </button>
        <IconButton className={styles.button} onClick={toggleChatbot}>
          <img src={Icon} />
        </IconButton>
        {isChatbotOpen && <ChatbotWidget toggleChatbot={toggleChatbot} />}
      </main>
      <DescriptionAlerts />
      <ToastContainer position="bottom-right" theme="dark" newestOnTop />
    </StyledEngineProvider>
  );
}
