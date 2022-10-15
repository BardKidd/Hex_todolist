import { rest } from "msw";

const handlers = [
  rest.post("https://todoo.5xcamp.us/users/sign_in", (req, res, ctx) => {
    return res(
      ctx.json({
        message: "登入測試",
      })
    );
  }),
];

export { handlers };
