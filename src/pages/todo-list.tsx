import List, { ListItem } from '@/components/list';

interface TodoListItemProps {
  id: string;
  description: string;
}

let latId = 0;
const getId = () => {
  latId += 1;
  return latId.toString();
};

const TodoListItem = ({ id, description }: TodoListItemProps) => (
  <ListItem id={id} flex-content-between todo-item>
    <span style={{ flex: '0 0 30px' }}>
      <input type="checkbox" ev-handler="toggle" />
    </span>
    <span style={{ flex: '0 1 100%' }}>
      <input type="text" value={description} hidden />
      <span>{description}</span>
    </span>
    <span style={{ flex: '1 0 auto' }}>
      <button type="button" ev-handler="edit">
        edit
      </button>
      <button type="button" ev-handler="remove">
        remove
      </button>
    </span>
  </ListItem>
);

const TodoList = () => {
  const todos = [
    { id: getId(), description: 'todo 1' },
    { id: getId(), description: 'todo 2' },
    { id: getId(), description: 'todo 3' },
  ];

  const todoList = (
    <List>
      {todos.map(({ id, description }) => (
        <TodoListItem id={id} description={description} />
      ))}
    </List>
  );

  const handlerToggle = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const parent = target.closest('[todo-item]');
    if (parent) {
      parent.removeAttribute('success');
      if ((target as HTMLInputElement).checked) {
        parent.setAttribute('success', '');
      }
    }
  };

  const handlerRemove = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const parent = target.closest('[todo-item]');
    if (parent) {
      todos.splice(
        todos.findIndex((todo) => todo.id === parent.id),
        1,
      );
      parent.remove();
    }
  };

  const handlerEdit = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const parent = target.closest('[todo-item]');
    if (parent) {
      const input = parent.querySelector('input[type="text"]') as HTMLInputElement;
      const span = input.nextElementSibling as HTMLSpanElement;

      const handlerUpdate = (_e: KeyboardEvent | FocusEvent) => {
        if ((_e instanceof KeyboardEvent && _e.key === 'Enter') || _e instanceof FocusEvent) {
          input.setAttribute('hidden', '');
          span.removeAttribute('hidden');
          span.replaceChildren(document.createTextNode(input.value));
          input.removeEventListener('keydown', handlerUpdate);
          input.removeEventListener('blur', handlerUpdate);
        }
      };

      span.setAttribute('hidden', '');
      input.removeAttribute('hidden');
      input.focus();
      input.addEventListener('blur', handlerUpdate);
      input.addEventListener('keydown', handlerUpdate);
    }
  };

  todoList.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.matches('[ev-handler]')) {
      switch (target.getAttribute('ev-handler')) {
        case 'toggle':
          handlerToggle(e);
          break;
        case 'remove':
          handlerRemove(e);
          break;
        case 'edit':
          handlerEdit(e);
          break;
        default:
          break;
      }
    }
  });

  const btnAddTodo = <button type="button">Add todo</button>;
  btnAddTodo.addEventListener('click', () => {
    todos.push({ id: getId(), description: 'new todo' });

    const { id, description } = todos[todos.length - 1];
    todoList.appendChild(<TodoListItem id={id} description={description} />);
  });

  return (
    <>
      {btnAddTodo}
      {todoList}
    </>
  );
};

export default TodoList;
