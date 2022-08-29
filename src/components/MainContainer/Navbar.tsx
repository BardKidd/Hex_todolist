import { Logo } from "@/components/HomeContainer/DecorateBox";

type NavbarProps = {
  onClick?: () => void;
};

const UserAccount = ({ onClick }: NavbarProps) => {
  const user = JSON.parse(sessionStorage.getItem("userInfo"));
  let nickname;
  if (user) {
    nickname = user.nickname;
  }
  return (
    <div className="todo-flex todo-justify-center todo-align-center">
      <h2 className="todo-hidden sm:todo-inline-block todo-font-bold todo-text-base todo-mr-4 todo-mb-0">
        {nickname} 的代辦
      </h2>
      <button type="button" onClick={() => onClick()}>
        登出
      </button>
    </div>
  );
};

/**
 * 可以傳入登出事件
 * @param param0
 * @returns
 */
const Navbar = ({ onClick }: NavbarProps) => {
  return (
    <div className="todo-flex todo-justify-between todo-items-center">
      <Logo />
      <UserAccount onClick={onClick} />
    </div>
  );
};

export default Navbar;
