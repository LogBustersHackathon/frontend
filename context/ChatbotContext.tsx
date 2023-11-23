// ChatbotContext.js
"use client";
import React, { createContext, useContext, useState } from "react";

const ChatbotContext = createContext<{
  chatbotState: { action: string | null; data: any | null };
  setChatbotState: any;
} | null>(null);

export const useChatbotContext = () => useContext(ChatbotContext);

export const ChatbotProvider = ({ children }: any) => {
  const [chatbotState, setChatbotState] = useState({
    action: null,
    data: null,
  });

  return (
    <ChatbotContext.Provider value={{ chatbotState, setChatbotState }}>
      {children}
    </ChatbotContext.Provider>
  );
};
