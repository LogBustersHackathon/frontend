// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "Log Buster",
  initialMessages: [createChatBotMessage(`Hello world`, { widget: "options" })],
};

export default config;
