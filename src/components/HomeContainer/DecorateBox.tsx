import Person from "@/assets/Image/person.svg";
import Online from "@/assets/Image/online.svg";
import Checkout from "@/assets/Image/checkout.svg";

export const Logo = () => {
  return (
    <div className="todo-flex todo-justify-center todo-items-center todo-text-center">
      <img className="todo-inline-block" src={Checkout} alt="裝飾標題相片" />
      <img className="todo-inline-block" src={Online} alt="裝飾標題相片" />
    </div>
  );
};

const DecorateBox = () => {
  return (
    <div className="todo-block sm:todo-flex sm:todo-flex-col sm:todo-content-center sm:todo-justify-center">
      <Logo />
      <img
        src={Person}
        alt="裝飾人物相片"
        className="todo-hidden sm:todo-block todo-mx-auto todo-mt-4"
      />
    </div>
  );
};

export default DecorateBox;
