import { useEffect, useState } from "react";
import { MainContainer, Navbar } from "@/components/MainContainer";
import { userLogout } from "./MainAction";
import Todo, { TodoModule } from "@/components/Todo";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import checkAuth from "@/utils/Auth";
import {
  getTodos,
  addTodos,
  editTodos,
  deleteTodos,
  changeStatusTodos,
} from "./MainAction";
import type { RootState } from "@/store";

const MainStyles = styled.div`
  background: linear-gradient(
    172.7deg,
    #ffd370 5.12%,
    #ffd370 53.33%,
    #ffd370 53.44%,
    #ffffff 53.45%,
    #ffffff 94.32%
  );
  padding: 50px;
`;
MainStyles.displayName = "MainStyles";

interface TodoItemType {
  id: string;
  content: string;
  completed_at: string;
}

const Main: React.FC = () => {
  const [filterType, setFilterType] = useState("unfinished");
  const [doSomething, setDoSomething] = useState("");

  // 原始 todos
  const todos = useSelector((state: RootState) => state.mainReducer.todos);
  // 畫面上顯示的 todos
  const [mainTodos, setMainTodos] = useState(todos);

  const loginMessage = useSelector(
    (state: RootState) => state.loginReducer.loginMessage
  );
  const loginState = useSelector(
    (state: RootState) => state.loginReducer.loginState
  );
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    let current = [];
    current = todos.filter((item: TodoItemType) => {
      if (item.completed_at && filterType === "finished") {
        return item;
      } else if (!item.completed_at && filterType === "unfinished") {
        return item;
      } else if (filterType === "all") {
        return item;
      }
    });

    setMainTodos(current);
  }, [filterType, JSON.stringify(todos)]);

  useEffect(() => {
    if ((loginMessage === "已登出" && !loginState) || !checkAuth()) {
      history("/");
    } else {
      dispatch(getTodos());
    }
  }, [loginMessage, loginState]);

  return (
    <MainStyles>
      <Navbar onClick={handleLogout} />
      <MainContainer>
        <TodoModule>
          <Todo.AddNewItem
            pushSomeThing={addTodos}
            value={doSomething}
            onChange={setDoSomething}
          />
          {todos.length ? (
            <Todo.TodoBox>
              <Todo.FilterTypeBar>
                <Todo.Label
                  checked={filterType === "all"}
                  onClick={() => setFilterType("all")}
                >
                  全部
                </Todo.Label>
                <Todo.Label
                  checked={filterType === "unfinished"}
                  onClick={() => setFilterType("unfinished")}
                >
                  待完成
                </Todo.Label>
                <Todo.Label
                  checked={filterType === "finished"}
                  onClick={() => setFilterType("finished")}
                >
                  完成
                </Todo.Label>
              </Todo.FilterTypeBar>
              {mainTodos.map((item: TodoItemType) => (
                <Todo.TodoItem
                  key={item.id}
                  itemInfo={item}
                  handleEdit={editTodos}
                  handleDelete={deleteTodos}
                  handleChangeStatus={changeStatusTodos}
                />
              ))}
              <Todo.TodoFooter todos={todos} deleteCompleted={deleteTodos} />
            </Todo.TodoBox>
          ) : (
            <Todo.NoTodos />
          )}
        </TodoModule>
      </MainContainer>
    </MainStyles>
  );
};

export default Main;
