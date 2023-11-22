"use client";

import { useEffect, useState } from "react";
import { ChatbotWidget } from "../components/ChatbotWidget/ChatbotWidget";
import styles from "./page.module.css";

import { subscribeToNatsAlerts } from "@/wsConnection/natsConnection";

export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);

  const toggleChatbot = () => {
    setIsChatbotOpen((isChatbotOpen) => !isChatbotOpen);
  };

  useEffect(() => {
    let natsResources: any;

    const handleMessage = (message: any) => {
      const alertMessage = new TextDecoder().decode(message.data);
      setAlerts((currentAlerts) => [...currentAlerts, alertMessage]);
    };

    const initNatsSubscription = async () => {
      natsResources = await subscribeToNatsAlerts(handleMessage);
    };

    initNatsSubscription();

    return () => {
      if (natsResources) {
        natsResources.subscription.unsubscribe();
        natsResources.nc.close();
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
