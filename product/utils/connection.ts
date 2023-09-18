import amqp from "amqplib";

const amqpServer = "amqp://localhost:5672";
let channel: any;
let connect: any;
let result: any;

const myConnection = async (queue: string, data: any) => {
  try {
    connect = await amqp.connect(amqpServer);
    channel = await connect.createChannel();

    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log("error connecting...");
  }
};

export { myConnection, connect, channel, result };
