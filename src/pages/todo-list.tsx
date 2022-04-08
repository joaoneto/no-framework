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
      <input type="checkbox" ev-toggle />
    </span>
    <span style={{ flex: '0 1 100%' }}>{description}</span>
    <span style={{ flex: '1 0 auto' }}>
      <button type="button" ev-edit>
        edit
      </button>
      <button type="button" ev-remove>
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

  todoList.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.matches('[ev-remove]')) {
      const parent = target.closest('[todo-item]');
      if (parent) {
        todos.splice(
          todos.findIndex((todo) => todo.id === parent.id),
          1,
        );
        parent.remove();
      }
      return;
    }

    if (target.matches('[ev-toggle]')) {
      const parent = target.closest('[todo-item]') as HTMLElement;
      if (parent) {
        parent.removeAttribute('success');
        if ((target as HTMLInputElement).checked) {
          parent.setAttribute('success', '');
        }
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
