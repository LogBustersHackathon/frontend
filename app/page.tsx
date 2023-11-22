"use client";

import { useState } from "react";
import { ChatbotWidget } from "../components/ChatbotWidget/ChatbotWidget";
import styles from "./page.module.css";

export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen((isChatbotOpen) => !isChatbotOpen);
  };
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
