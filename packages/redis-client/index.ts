import { createClient } from "redis";
const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));

const STREAM_NAME = "betteruptime:website";
type WebSiteEvent = { id: string; url: string };

interface StreamMessages {
  name: string;
  messages: Array<{
    id: string;
    message: Record<string, string>;
  }>;
}

const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
};
connectRedis();

async function XADD({ id, url }: WebSiteEvent) {
  await client.xAdd(STREAM_NAME, "*", {
    id,
    url,
  });
}

export async function xBulk(websites: WebSiteEvent[]) {
  websites.map((w) => {
    XADD(w);
  });
}

export async function xReadGroup(CONSUMER_GROUP: string, WORKER_ID: string) {
  const res: any = await client.xReadGroup(
    CONSUMER_GROUP,
    WORKER_ID,
    {
      key: STREAM_NAME,
      id: ">",
    },
    {
      COUNT: 5,
    }
  );
  if (!res) {
    return;
  }
  return res[0].messages;
}

export async function xAck(CONSUMER_GROUP: string, streamId: string) {
  await client.xAck(STREAM_NAME, CONSUMER_GROUP, streamId);
}
