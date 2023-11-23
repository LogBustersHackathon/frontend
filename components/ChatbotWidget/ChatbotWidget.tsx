"use client";
import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

import style from "./ChatbotWidget.module.css";

import { createChatBotMessage } from "react-chatbot-kit";

const LinkButton = ({ linkUrl = "https://example.com" }: any) => {
  return (
    <button onClick={() => (window.location.href = linkUrl)}>Go to Page</button>
  );
};

export const ChatbotWidget = ({
  toggleChatbot,
}: {
  toggleChatbot: () => void;
}) => {
  const config = {
    botName: "Log Buster",
    initialMessages: [createChatBotMessage("Hello there", {})],
    widgets: [
      {
        widgetName: "linkButton",
        widgetFunc: (props: any) => <LinkButton {...props} />,
        props: {},
        mapStateToProps: ["linkUrl"],
      },
    ],
  };
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
