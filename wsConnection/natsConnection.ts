import { connect } from "nats.ws";

export const subscribeToNatsAlerts = async (
  handleMessage: (m: any) => void
) => {
  try {
    const nc = await connect({ servers: "ws://your-nats-server-url" });
    const subscription = nc.subscribe("alert-subject");

    (async () => {
      for await (const message of subscription) {
        handleMessage(message);
      }
    })();

    return { nc, subscription };
  } catch (err) {
    console.error("Error connecting to NATS or receiving messages:", err);
    return null;
  }
};
