"use client";

import { useEffect, useState } from "react";
import { ChatbotWidget } from "../components/ChatbotWidget/ChatbotWidget";
import styles from "./page.module.css";

import { subscribeToSubject } from "../wsConnection/natsConnection";

import { ToastContainer } from "react-toastify";
import { StyledEngineProvider } from "@mui/material/styles";
import "react-toastify/ReactToastify.min.css";
import { DescriptionAlerts } from "@/components/alert/descriptionAlerts";
import { createToastMessage } from "@/components/alert/utils";
import { useChatbotContext } from "@/context/ChatbotContext";

import Icon from "../public/Logbusters.svg";

export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [id, setId] = useState<number>(0);

  const [showDetails, setShowDetails] = useState<boolean>(false);

  console.log("isChatbotOpen", isChatbotOpen);

  const { chatbotState, setChatbotState } = useChatbotContext() as any;

  console.log("chatbotState", chatbotState);

  const toggleChatbot = () => {
    setIsChatbotOpen((isChatbotOpen) => !isChatbotOpen);
  };

  useEffect(() => {
    let unsubscribe: () => void;

    const initSubscription = async () => {
      try {
        unsubscribe = await subscribeToSubject("alarms", (message: any) => {
          const msg = JSON.parse(message);

          let statusDescription: string;
          switch (msg.AlarmType) {
            case 0:
              statusDescription =
                "The system is healthy and functioning as expected.";
              break;
            case 1:
              statusDescription =
                "Critical alert! Immediate attention required. There could be a significant risk to the system.";
              break;

            case 2:
              statusDescription =
                "Warning: The system is in a state that requires attention, but it is not critical yet.";
              break;
            default:
              break;
          }

          setAlerts((currentAlerts) => [...currentAlerts, statusDescription]);
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

  //create toast message if new alert is received
  useEffect(() => {
    if (alerts.length > 0) {
      createToastMessage(alerts[alerts.length - 1]);
    }
  }, [alerts]);

  useEffect(() => {
    if (isChatbotOpen) {
      console.log("I am here");
      setChatbotState({
        action: "analyze",
        data: "Solution",
      });
    }
  }, [isChatbotOpen]);

  return (
    <StyledEngineProvider injectFirst>
      <main className={styles.main}>
        <div className={styles.center}></div>

        <Icon
          className={styles.button}
          onClick={toggleChatbot}
          style={{ width: "100px", height: "100px" }}
        />
        {isChatbotOpen && <ChatbotWidget toggleChatbot={toggleChatbot} />}
      </main>
      <DescriptionAlerts
        setId={setId}
        setIsChatbotOpen={setIsChatbotOpen}
        setShowDetails={setShowDetails}
      />
      <ToastContainer position="bottom-right" theme="dark" newestOnTop />
    </StyledEngineProvider>
  );
}
