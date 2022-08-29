import styled from "styled-components";

type LabelProps = {
  checked: boolean;
};

export const Label = styled.label<LabelProps>`
  padding: 16px 69px;
  cursor: pointer;
  border-bottom: 3px solid ${({ checked }) => (checked ? "#333333" : "#9F9A91")};
  color: ${({ checked }) => (checked ? "#333333" : "#9F9A91")};
  transition: 0.228s;
  @media screen and (max-width: 640px) {
    padding: 16px 25px;
    text-align: center;
    flex: 1;
  }
`;
Label.displayName = "Label";

/**
 * Radio 元件
 * @param
 * @returns
 */
const FilterTypeBar = ({ children }: { children: any }) => {
  return (
    <>
      <div className="todo-flex todo-flex-wrap todo-justify-center todo-items-center todo-font-bold">
        {children}
      </div>
    </>
  );
};

export default FilterTypeBar;
