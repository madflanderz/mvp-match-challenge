// src/mocks/handlers.js
import { rest } from "msw";
import { report } from "./report";
export const handlers = [
  rest.post(
    "http://178.63.13.157:8090/mock-api/api/report",
    (req, res, ctx) => {
      console.log("YEAHHHHHHHH");

      return res(
        // Respond with a 200 status code
        ctx.status(200),
        ctx.json(report)
      );
    }
  ),
  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
];
