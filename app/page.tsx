"use client";

import { useEffect, useState } from "react";
import { ChatbotWidget } from "../components/ChatbotWidget/ChatbotWidget";
import styles from "./page.module.css";

import { subscribeToSubject } from "@/wsConnection/natsConnection";

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
    <main className={styles.main}>
      <div className={styles.center}></div>

      <button className={styles.button} onClick={toggleChatbot}>
        {isChatbotOpen ? "Close" : "Open"} Chatbot
      </button>
      {isChatbotOpen && <ChatbotWidget toggleChatbot={toggleChatbot} />}
    </main>
  );
}
