"use client";

import { useState } from "react";
import { ChatbotWidget } from "../components/ChatbotWidget/ChatbotWidget";
import styles from "./page.module.css";
import { ToastContainer, toast } from "react-toastify";
import { StyledEngineProvider } from "@mui/material/styles";
import "react-toastify/ReactToastify.min.css";
import DescriptionAlerts from "@/components/alert/descriptionAlerts";
import { createToastMessage } from "@/components/alert/utils";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen((isChatbotOpen) => !isChatbotOpen);
  };

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
        <button className={styles.button} onClick={toggleChatbot}>
          {isChatbotOpen ? "Close" : "Open"} Chatbot
        </button>
        {isChatbotOpen && <ChatbotWidget toggleChatbot={toggleChatbot} />}
      </main>
      <DescriptionAlerts />
      <ToastContainer position="bottom-right" theme="dark" newestOnTop />
    </StyledEngineProvider>
  );
}
