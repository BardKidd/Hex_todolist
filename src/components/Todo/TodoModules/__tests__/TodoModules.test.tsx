import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddNewItem from "../AddNewItem";
import TodoItem from "../TodoItem";
import * as redux from "react-redux";
// import { store, history } from "@/store";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { mockStore } from "../../../../__mocks__/setUp";
import * as MainAction from "@/pages/Main/MainAction";

jest.mock("react-redux");

test("[TodoModules AddNewItem][AddNewItem render]", async () => {
  const pushSomeThing = jest.fn();
  const value = "";
  const onChange = jest.fn();
  const { container } = render(
    <AddNewItem
      pushSomeThing={pushSomeThing}
      value={value}
      onChange={onChange}
    />
  );

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="todo-w-full todo-shadow-[0_0_15px_0_rgba(0,0,0,0.15)] todo-flex todo-items-center todo-bg-white todo-rounded-lg"
  >
    <input
      class="todo-rounded-l-lg todo-text-[#9F9A91] todo-w-full todo-h-full todo-py-3 todo-px-4 todo-outline-0"
      placeholder="新增代辦事項"
      value=""
    />
    <img
      alt="新增按鈕"
      class="todo-cursor-pointer todo-pr-1 todo-py-1"
      src="test-file-stub"
    />
  </div>
</div>
`);
});

test("[TodoModules AddNewItem][AddNewItem component clears the Value after click]", async () => {
  const pushSomeThing = jest.fn();
  const value = "";
  const onChange = jest.fn();
  const useDispatchSpy = jest.spyOn(redux, "useDispatch");

  render(
    <AddNewItem
      pushSomeThing={pushSomeThing}
      value={value}
      onChange={onChange}
    />
  );

  const inputEl = screen.getByRole("textbox");
  const addBtn = screen.getByRole("img", {
    name: /新增按鈕/i,
  });

  const content = "新的代辦事項";

  await fireEvent.change(inputEl, {
    target: { value: content },
  });

  userEvent.click(addBtn);

  // useDispatchSpy.mockReturnValue(pushSomeThing);

  expect(inputEl).not.toHaveTextContent(content);
});

test("[TodoModules AddNewItem][AddNewItem component 可以送 action]", async () => {
  const pushSomeThing = jest.fn();
  const value = "";
  const onChange = jest.fn();
  const initialState = {};
  const store = mockStore(initialState);
  render(
    <AddNewItem
      pushSomeThing={pushSomeThing}
      value={value}
      onChange={onChange}
    />
  );

  const inputEl = screen.getByRole("textbox");
  const addBtn = screen.getByRole("img", {
    name: /新增按鈕/i,
  });

  const content = "新的代辦事項";

  await fireEvent.change(inputEl, {
    target: { value: content },
  });

  userEvent.click(addBtn);

  await store.dispatch(MainAction.addTodos(content));

  expect(store.getActions()[0].type).toEqual(
    MainAction.createType.MAIN_ADD_TODOS
  );
  expect(store.getActions()[0].content).toEqual(content);
});

test("[TodoModules TodoItem][TodoItem component render]", async () => {
  const key = "9999";
  const itemInfo = {
    id: "8888",
    content: "測試中",
    completed_at: "",
  };
  const handleEdit = jest.fn();
  const handleDelete = jest.fn();
  const handleChangeStatus = jest.fn();
  render(
    <TodoItem
      key={key}
      itemInfo={itemInfo}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleChangeStatus={handleChangeStatus}
    />
  );

  const Item = screen.getByText(/測試中/i);

  expect(Item).toBeInTheDocument();
});

test("[TodoModules TodoItem][TodoItem is editing]", async () => {
  const key = "9999";
  const itemInfo = {
    id: "8888",
    content: "測試中",
    completed_at: "",
  };
  const handleEdit = jest.fn();
  const handleDelete = jest.fn();
  const handleChangeStatus = jest.fn();
  render(
    <TodoItem
      key={key}
      itemInfo={itemInfo}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleChangeStatus={handleChangeStatus}
    />
  );

  const Item = screen.getByText(/測試中/i);

  userEvent.click(Item);
  await waitFor(() => {
    screen.getByRole("textbox");
  });

  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("[TodoModules TodoItem][TodoItem call changeStatue]", async () => {
  const key = "9999";
  let itemInfo = {
    id: "8888",
    content: "測試中",
    completed_at: "",
  };
  const handleEdit = jest.fn();
  const handleDelete = jest.fn();
  const handleChangeStatus = jest.fn();

  //* 點擊 checkbox 會觸發 dispatch，所以要 mock。然後必須在 render 前執行。
  const useDispatchSpy = jest.spyOn(redux, "useDispatch");
  const dispatch = jest.fn();
  await useDispatchSpy.mockReturnValue(dispatch);

  const { rerender } = render(
    <TodoItem
      key={key}
      itemInfo={itemInfo}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleChangeStatus={handleChangeStatus}
    />
  );

  const Checkbox = screen.getByTestId("checkbox");

  // screen.debug(Checkbox);
  await userEvent.click(Checkbox);

  itemInfo = {
    id: "8888",
    content: "測試中",
    completed_at: "2022-10-15",
  };

  rerender(
    <TodoItem
      key={key}
      itemInfo={itemInfo}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleChangeStatus={handleChangeStatus}
    />
  );

  const Tick = screen.getByTestId("tick");

  expect(Tick).toBeInTheDocument();
});
