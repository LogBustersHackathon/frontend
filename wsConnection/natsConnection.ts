import { connect, NatsConnection, Subscription } from "nats.ws";

export const connectToNats = async (): Promise<NatsConnection | null> => {
  try {
    const nc = await connect({ servers: "ws://37.1.151.67:4223" });
    console.log("Connected to NATS via WebSocket");
    return nc;
  } catch (err) {
    console.error("Error connecting to NATS:", err);
    return null;
  }
};

export const subscribeToSubject = async (
  subject: string,
  handleMessage: (message: string) => void
): Promise<() => void> => {
  const nc: NatsConnection | null = await connectToNats();

  if (!nc) {
    throw new Error("Failed to connect to NATS");
  }

  const subscription: Subscription = nc.subscribe(subject);

  (async () => {
    for await (const message of subscription) {
      const messageContent = new TextDecoder().decode(message.data);
      handleMessage(messageContent);
    }
  })();

  return () => subscription.unsubscribe();
};
