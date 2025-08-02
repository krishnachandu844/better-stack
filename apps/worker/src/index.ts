import prisma from "@repo/db/client";
import { xReadGroup, xAck } from "@repo/redis-client/client";
import axios from "axios";

// const REGION_ID = process.env.REGION_ID;
// const WORKER_ID = process.env.WORKER_ID;
const CONSUMER_GROUP = "india";
const WORKER_ID = "india-1";

async function main() {
  // while (1) {}
  const response = await xReadGroup(CONSUMER_GROUP, WORKER_ID);
  let promises = response.map((res: any) =>
    fetchWebsites(res.message.id, res.message.url)
  );
  await Promise.all(promises);
}

//Fetching Websites
async function fetchWebsites(id: string, url: string) {
  return new Promise<void>((resolve, reject) => {
    // const { id, url } = res.message;
    const startTime = Date.now();
    axios
      .get(url)
      .then(async () => {
        const endTime = Date.now();
        await prisma.websiteTick.create({
          data: {
            response_time_ms: endTime - startTime,
            website_id: id,
            // region_id: CONSUMER_GROUP,
            status: "Up",
          },
        });
        resolve();
      })
      .catch(async () => {
        const endTime = Date.now();
        await prisma.websiteTick.create({
          data: {
            response_time_ms: endTime - startTime,
            website_id: id,
            // region_id: CONSUMER_GROUP,
            status: "Down",
          },
        });
        resolve();
      });
  });
}

main();
