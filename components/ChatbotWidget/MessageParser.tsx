// MessageParser starter code

import ActionProvider from "./ActionProvider"; // Import the ActionProvider class
import { useChatbotContext } from "../../context/ChatbotContext";

// Define the type for the state if it has a specific structure
interface IState {
  // Define the state structure here
}

class MessageParser {
  private actionProvider: ActionProvider;
  private state: IState;

  constructor(actionProvider: ActionProvider, state: IState) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message: string) {
    const { chatbotState } = useChatbotContext() as any;

    if (message.toLowerCase().includes("show details")) {
      this.actionProvider.sendLinkButtonMessage();
    }

    if (chatbotState.action === "analyze") {
      this.actionProvider.sendAnalyzeMessage(chatbotState.data);
      // Reset the global state after handling
      // ...
    }

    // ... other parsing logic
  }
}

export default MessageParser;
