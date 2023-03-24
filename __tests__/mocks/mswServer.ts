import { setupServer } from "msw/node";
import { handlers } from "./mswHandlers";
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

server.events.on("request:start", (req) => {
  console.log(req.method, req.url.href);
});

console.log("MSWWWWWWWWWWWWWW");
