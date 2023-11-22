// ActionProvider starter code

interface IChatBotMessage {
  // Structure of your chatbot message (e.g., text, type, etc.)
}

interface IState {
  // Structure of your chatbot state (e.g., messages, current step, etc.)
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

  // Define methods for actions here...
}

export default ActionProvider;
