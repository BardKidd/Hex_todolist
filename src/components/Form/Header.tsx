const Header = (props: { children?: string }) => {
  return (
    <h1 className="todo-mb-6 todo-font-bold todo-text-2xl todo-text-center todo-mt-5 sm:todo-mt-0 sm:todo-text-left">
      {props.children}
    </h1>
  );
};

export default Header;
