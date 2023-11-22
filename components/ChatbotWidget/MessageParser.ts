// MessageParser starter code

import ActionProvider from "./ActionProvider"; // Import the ActionProvider class

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
    console.log(message);
    // Add your parsing logic here
  }
}

export default MessageParser;
