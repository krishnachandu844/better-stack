import prisma from "@repo/db/client";
import { xBulk } from "@repo/redis-client/client";
// const websites = [
//   {
//     id: "1",
//     url: "Google.com",
//   },
//   {
//     id: "2",
//     url: "Twitter.com",
//   },
// ];
async function main() {
  let websites = await prisma.website.findMany({
    select: {
      id: true,
      url: true,
    },
  });
  console.log(websites);
  xBulk(websites);
}

main();
setInterval(main, 10 * 1000);
