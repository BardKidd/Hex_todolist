import tick from "@/assets/Image/tick.svg";
import checkbox from "@/assets/Image/checkbox.svg";
import closeItem from "@/assets/Image/closeItem.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { editTodos } from "@/pages/Main/MainAction";

type TodoItemType = {
  itemInfo: {
    id: string;
    content: string;
    completed_at: string;
  };
  handleEdit?: any;
  handleDelete?: any;
  handleChangeStatus?: any;
};

/**
 * Todo 的項目
 * @param itemInfo: 該項目的資料，會需要 id、content、completed_at
 * @param handleEdit: 處理編輯，只需傳入 Action
 * @param handleDelete: 處理刪除，只需傳入 Action
 * @param handleChangeStatus: 處理切換模式，只需傳入 Action
 * @returns
 */

const TodoItem = ({
  itemInfo,
  handleEdit,
  handleDelete,
  handleChangeStatus,
}: TodoItemType) => {
  const { content, id: itemId, completed_at } = itemInfo;
  const [isEdit, setIsEdit] = useState(false);
  const [todo, setTodo] = useState(content);
  const dispatch = useDispatch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (todo) {
        dispatch(handleEdit(todo, itemId));
        setIsEdit(false);
      } else {
        notification.info({
          message: "提示",
          description: "請輸入些甚麼吧~",
        });
      }
    }
  };

  const editTodos = () => {
    if (!completed_at) {
      setIsEdit(true);
    }
  };

  const cancelEdit = () => {
    setTodo(content);
    setIsEdit(false);
  };

  const deleteItem = () => {
    dispatch(handleDelete(itemId));
  };

  const changeStatus = () => {
    dispatch(handleChangeStatus(itemId));
  };

  return (
    <div className="todo-flex todo-justify-between todo-items-center todo-px-6 todo-pt-6">
      {!isEdit ? (
        <>
          <div className="todo-flex todo-flex-1 todo-border-b todo-border-[#E5E5E5] todo-pb-4">
            <img
              data-testid={completed_at ? "tick" : "checkbox"}
              className="todo-cursor-pointer"
              src={completed_at ? tick : checkbox}
              onClick={() => changeStatus()}
            />
            <p
              className={`todo-pl-4 todo-font-baseFamily todo-mb-0 ${
                completed_at
                  ? "todo-line-through todo-text-[#9F9A91]"
                  : "todo-cursor-pointer hover:todo-underline"
              }`}
              onClick={() => editTodos()}
            >
              {todo}
            </p>
          </div>
          <div className="todo-pl-4">
            <img
              className="todo-cursor-pointer todo-pb-4"
              onClick={() => deleteItem()}
              src={closeItem}
            />
          </div>
        </>
      ) : (
        <>
          <div className="todo-flex todo-flex-1 todo-border-b todo-border-[#E5E5E5] todo-pb-4">
            <input
              className="todo-w-full todo-py-2 todo-pl-2 todo-border-2 todo-rounded todo-outline-0"
              type="text"
              value={todo}
              onKeyDown={handleKeyDown}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <div className="todo-pl-4">
            <img
              className="todo-cursor-pointer todo-pb-4"
              onClick={() => cancelEdit()}
              src={closeItem}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
