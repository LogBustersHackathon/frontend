"use client";

import { useState } from "react";
import { ChatbotWidget } from "../components/ChatbotWidget/ChatbotWidget";
import styles from "./page.module.css";
import { ToastContainer } from "react-toastify";
import { StyledEngineProvider } from "@mui/material/styles";
import "react-toastify/ReactToastify.min.css";
import DescriptionAlerts from "@/components/alert/descriptionAlerts";

export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen((isChatbotOpen) => !isChatbotOpen);
  };
  return (
    <StyledEngineProvider injectFirst>
      <main className={styles.main}>
        <div className={styles.center}></div>
        <button className={styles.button} onClick={toggleChatbot}>
          {isChatbotOpen ? "Close" : "Open"} Chatbot
        </button>
        {isChatbotOpen && <ChatbotWidget toggleChatbot={toggleChatbot} />}
      </main>
      <DescriptionAlerts />
      <ToastContainer position="bottom-right" newestOnTop />
    </StyledEngineProvider>
  );
}
