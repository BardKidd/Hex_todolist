import Input from "./Input";
import Header from "./header";
import Button from "./Button";

const Form = (props: any) => {
  return (
    <form className="sm:todo-p-12" onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export { Input, Header, Button };
export default Form;
