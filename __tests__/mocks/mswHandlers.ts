import { rest } from "msw";
import { report } from "./report";
export const handlers = [
  rest.post("http://localhost/api/report", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(report)
    );
  }),
];
