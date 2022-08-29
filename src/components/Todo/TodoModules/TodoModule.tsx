import styled from "styled-components";

/**
 * 因為使用 `flex-direction: column;`
 * 所以直接往下引用即可，不用再額外包一層。
 */
export const TodoBox = styled.div`
  margin-top: 1rem;
  box-shadow: 0px 0px 15px 0px #00000026;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  font-size: 14px;
  background-color: #fff;
  width: 100%;
`;
TodoBox.displayName = "TodoBox";

const TodoModule = ({ children }: { children: any }) => {
  return (
    <div className="todo-w-full sm:todo-w-2/5 sm:todo-min-w-[500px]">
      {children}
    </div>
  );
};

export default TodoModule;
