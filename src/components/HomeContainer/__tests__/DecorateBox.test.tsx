import DecorateBox, { Logo } from "../DecorateBox";
import { render, screen } from "@testing-library/react";

test("DecorateBox Logo render", async () => {
  const { container } = render(<Logo />);

  expect(container).toMatchInlineSnapshot(`
<div>
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
</div>
`);
});

test("DecorateBox render", async () => {
  const { container } = render(<DecorateBox />);

  expect(container).toMatchInlineSnapshot(`
<div>
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
</div>
`);
});

test("Login error", async () => {});
