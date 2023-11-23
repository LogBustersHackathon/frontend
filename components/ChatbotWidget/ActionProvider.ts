// ActionProvider starter code

interface IChatBotMessage {
  // Structure of your chatbot message (e.g., text, type, etc.)
}

interface IState {
  // Structure of your chatbot state (e.g., messages, current step, etc.)
  messages: IChatBotMessage[];
}

class ActionProvider {
  private createChatBotMessage: (
    text: string,
    options?: any
  ) => IChatBotMessage;
  private setState: (state: IState | ((state: IState) => IState)) => void;
  private createClientMessage: (text: string, options?: any) => IChatBotMessage;
  private stateRef: React.MutableRefObject<IState>;
  private createCustomMessage: (
    component: React.ComponentType,
    props?: any
  ) => IChatBotMessage;

  constructor(
    createChatBotMessage: (text: string, options?: any) => IChatBotMessage,
    setStateFunc: (state: IState | ((state: IState) => IState)) => void,
    createClientMessage: (text: string, options?: any) => IChatBotMessage,
    stateRef: React.MutableRefObject<IState>,
    createCustomMessage: (
      component: React.ComponentType,
      props?: any
    ) => IChatBotMessage
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  // Helper function to update the state of the chatbot
  private updateChatbotState(message: IChatBotMessage) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

  public sendLinkButtonMessage() {
    const message = this.createChatBotMessage(
      "This machine, identified by its IP address, is experiencing several critical issues. It is advisable to promptly inspect the following applications: xxx.",
      {
        widget: "linkButton",
      }
    );

    this.updateChatbotState(message);
  }

  public sendAnalyzeMessage(data: any) {
    const message = this.createChatBotMessage("Analysis details:", {
      widget: "analyzeWidget",
      data: data, // Pass the analysis data to the widget
    });

    this.updateChatbotState(message);
  }
}

export default ActionProvider;
