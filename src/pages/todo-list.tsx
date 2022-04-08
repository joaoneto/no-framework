import List, { ListItem } from '@/components/list';

interface TodoListItemProps {
  id: string;
  description: string;
}

const TodoListItem = ({ id, description }: TodoListItemProps) => (
  <ListItem id={id} flex-content-between>
    <span style={{ flex: '0 0 30px' }}>{id}</span>
    <span style={{ flex: '0 1 100%' }}>{description}</span>
    <span style={{ flex: '1 0 auto' }}>
      <button type="button">edit</button>
      <button type="button">remove</button>
    </span>
  </ListItem>
);

const TodoList = () => {
  // const [todos, { map, rm, add }] = dataAndDOMHandlers([])
  const todos = [
    { id: '1', description: 'todo 1' },
    { id: '2', description: 'todo 2' },
    { id: '3', description: 'todo 3' },
  ];

  const todoList = (
    <List>
      {todos.map(({ id, description }) => (
        <TodoListItem id={id} description={description} />
      ))}
    </List>
  );

  const btnAddTodo = <button type="button">Add todo</button>;
  btnAddTodo.addEventListener('click', () => {
    const todosLength = todos.length + 1;
    todos.push({ id: String(todosLength), description: `todo ${todosLength}` });

    const { id, description } = todos[todos.length - 1];
    todoList.appendChild(<TodoListItem id={id} description={description} />);
  });

  const btnRemoveTodo = <button type="button">Remove todo</button>;
  btnRemoveTodo.addEventListener('click', () => {
    todos.pop();
    todoList.removeChild(todoList.childNodes.item(todoList.childNodes.length - 1));
  });

  return (
    <>
      {btnAddTodo}
      {btnRemoveTodo}
      {todoList}
    </>
  );
};

export default TodoList;
