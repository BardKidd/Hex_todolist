import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { server } from "../../../../__mocks__/server";
import Login from "../index";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, history } from "@/store";
import userEvent from "@testing-library/user-event";

// 啟動 msw，攔截 URL 並換成假資料
beforeAll(() => server.listHandlers());
// 關閉 server
afterAll(() => server.close());
// 為了防止改變到假資料，在最後將資料返回最初的樣子。
afterEach(() => server.resetHandlers());

test("[Login][Input tag should has value]", async () => {
  const setIsLogin = jest.fn();
  const { container } = render(
    <Provider store={store}>
      <HashRouter>
        <Login setIsLogin={setIsLogin} />
      </HashRouter>
    </Provider>
  );
  const LoginBtn = screen.getByRole("button", {
    name: /登入/i,
  });
  const EmailInput = screen.getByPlaceholderText("請輸入Email");
  const PasswordInput = screen.getByPlaceholderText("請輸入密碼");
  await fireEvent.change(EmailInput, { target: { value: "test@gmail.com" } });

  userEvent.click(LoginBtn);

  await waitFor(() => {
    screen.getByText(/密碼 為必填/i);
  });

  expect(container).toMatchInlineSnapshot(`
<div>
  <form
    class="sm:todo-p-12"
  >
    <h1
      class="todo-mb-6 todo-font-bold todo-text-2xl todo-text-center todo-mt-5 sm:todo-mt-0 sm:todo-text-left"
    >
      最實用的線上代辦事項服務
    </h1>
    <div
      class="todo-mb-4"
    >
      <p
        class="todo-font-bold todo-font-text-sm todo-leading-5 todo-mb-1"
      >
        Email
      </p>
      <input
        class="todo-px-3 todo-font-medium todo-text-base todo-py-4 todo-w-full todo-text-[#9F9A91] todo-leading-6	todo-rounded-lg todo-mb-1 todo-min-w-[300px] placeholder:todo-font-medium placeholder:todo-text-[#9F9A91]"
        name="email"
        placeholder="請輸入Email"
        type="text"
        value="test@gmail.com"
      />
    </div>
    <div
      class="todo-mb-4"
    >
      <p
        class="todo-font-bold todo-font-text-sm todo-leading-5 todo-mb-1"
      >
        密碼
      </p>
      <input
        class="todo-px-3 todo-font-medium todo-text-base todo-py-4 todo-w-full todo-text-[#9F9A91] todo-leading-6	todo-rounded-lg todo-mb-1 todo-min-w-[300px] placeholder:todo-font-medium placeholder:todo-text-[#9F9A91]"
        name="password"
        placeholder="請輸入密碼"
        type="password"
        value=""
      />
      <p
        class="todo-text-[#D87355] todo-font-bold todo-font-text-sm todo-leading-5"
      >
        密碼 為必填
      </p>
    </div>
    <button
      class="sc-bczRLJ kwxQIA"
      type="submit"
    >
      登入
    </button>
    <button
      class="sc-bczRLJ dqvwZL"
      type="button"
    >
      註冊
    </button>
  </form>
</div>
`);
});
