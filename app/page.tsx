"use client";

import { useEffect, useState } from "react";
import { ChatbotWidget } from "../components/ChatbotWidget/ChatbotWidget";
import styles from "./page.module.css";

import { subscribeToSubject } from "../wsConnection/natsConnection";

import { ToastContainer } from "react-toastify";
import { StyledEngineProvider } from "@mui/material/styles";
import "react-toastify/ReactToastify.min.css";
import DescriptionAlerts from "@/components/alert/descriptionAlerts";
import { createToastMessage } from "@/components/alert/utils";
export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [id, setId] = useState<number>(0);
  console.log(id);

  console.log("alerts", alerts);

  const toggleChatbot = () => {
    setIsChatbotOpen((isChatbotOpen) => !isChatbotOpen);
  };

  useEffect(() => {
    let unsubscribe: () => void;

    const initSubscription = async () => {
      try {
        unsubscribe = await subscribeToSubject("alarms", (message: string) => {
          createToastMessage(JSON.parse(message));
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
        <button className={styles.button} onClick={toggleChatbot}>
          {isChatbotOpen ? "Close" : "Open"} Chatbot
        </button>
        {isChatbotOpen && <ChatbotWidget toggleChatbot={toggleChatbot} />}
      </main>
      <DescriptionAlerts setId={setId} setIsChatbotOpen={setIsChatbotOpen} />
      <ToastContainer position="bottom-right" theme="dark" newestOnTop />
    </StyledEngineProvider>
  );
}
