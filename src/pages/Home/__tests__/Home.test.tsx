import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, history } from "@/store";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "../index";

test("[Home][Click Register Btn should change component]", async () => {
  const { container } = render(
    <Provider store={store}>
      <HashRouter>
        <Home />
      </HashRouter>
    </Provider>
  );

  const registerBtn = screen.getByRole("button", {
    name: /註冊/i,
  });

  userEvent.click(registerBtn);
  await waitFor(() => {
    screen.getByRole("heading", {
      name: /註冊帳號/i,
    });
  });

  expect(
    screen.getByRole("heading", {
      name: /註冊帳號/i,
    })
  ).toBeInTheDocument();

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="sc-bczRLJ lggcRq"
  >
    <div
      class="todo-block sm:todo-flex sm:todo-flex-col sm:todo-content-center sm:todo-justify-center"
    >
      <div
        class="todo-flex todo-justify-center todo-items-center todo-text-center"
      >
        <img
          alt="裝飾標題相片"
          class="todo-inline-block"
          src="test-file-stub"
        />
        <img
          alt="裝飾標題相片"
          class="todo-inline-block"
          src="test-file-stub"
        />
      </div>
      <img
        alt="裝飾人物相片"
        class="todo-hidden sm:todo-block todo-mx-auto todo-mt-4"
        src="test-file-stub"
      />
    </div>
    <form
      class="sm:todo-p-12"
    >
      <h1
        class="todo-mb-6 todo-font-bold todo-text-2xl todo-text-center todo-mt-5 sm:todo-mt-0 sm:todo-text-left"
      >
        註冊帳號
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
          value=""
        />
      </div>
      <div
        class="todo-mb-4"
      >
        <p
          class="todo-font-bold todo-font-text-sm todo-leading-5 todo-mb-1"
        >
          您的暱稱
        </p>
        <input
          class="todo-px-3 todo-font-medium todo-text-base todo-py-4 todo-w-full todo-text-[#9F9A91] todo-leading-6	todo-rounded-lg todo-mb-1 todo-min-w-[300px] placeholder:todo-font-medium placeholder:todo-text-[#9F9A91]"
          name="nickname"
          placeholder="請輸入您的暱稱"
          type="text"
          value=""
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
      </div>
      <div
        class="todo-mb-4"
      >
        <p
          class="todo-font-bold todo-font-text-sm todo-leading-5 todo-mb-1"
        >
          再次輸入密碼
        </p>
        <input
          class="todo-px-3 todo-font-medium todo-text-base todo-py-4 todo-w-full todo-text-[#9F9A91] todo-leading-6	todo-rounded-lg todo-mb-1 todo-min-w-[300px] placeholder:todo-font-medium placeholder:todo-text-[#9F9A91]"
          name="rePassword"
          placeholder="請再次輸入密碼"
          type="password"
          value=""
        />
      </div>
      <button
        class="sc-gsnTZi cJMgXC"
        type="submit"
      >
        註冊帳號
      </button>
      <button
        class="sc-gsnTZi imjRGd"
        type="button"
      >
        登入
      </button>
    </form>
  </div>
</div>
`);
});
