import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

import style from "./ChatbotWidget.module.css";

export const ChatbotWidget = ({
  toggleChatbot,
}: {
  toggleChatbot: () => void;
}) => {
  return (
    <div className={style.chatbotWidgetContainer}>
      <button className={style.closeButton} onClick={toggleChatbot}>
        X
      </button>

      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};
