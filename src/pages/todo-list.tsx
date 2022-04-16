import '@/lib/create-element';
import { each, click, remove, add, edit, listen } from '@/lib/behaviours';
import List, { ListItem } from '@/components/list';

interface Todo {
  text: string;
  completed?: boolean;
}

const selector = '[todo-list]';

let lastDataId = 0;
const getDataId = () => {
  lastDataId += 1;
  return lastDataId.toString();
};

const TodoListItem = ({ text, completed, ...props }: Todo) => {
  const getParentItem = (event: Event) => {
    const target = event.target as HTMLElement;
    return target.closest('[data-id]');
  };

  const onRemove = (event: Event) => {
    const item = getParentItem(event);
    const dataId = item?.getAttribute('data-id');
    if (dataId) {
      remove(selector)(dataId);
    }
  };

  const saveTodo = (event: Event) => {
    if (
      event.type === 'blur' ||
      event.type === 'change' ||
      (event as KeyboardEvent).key === 'Enter'
    ) {
      const item = getParentItem(event);
      const dataId = item?.getAttribute('data-id');
      const textInput = item?.querySelector('[data-text-input]') as HTMLInputElement;
      const dataTextElement = item?.querySelector('[data-text]');
      const dataCompleted = item?.querySelector('[data-completed-input]') as HTMLInputElement;

      textInput.removeEventListener('keyup', saveTodo);
      textInput.removeEventListener('blur', saveTodo);

      dataTextElement?.removeAttribute('hidden');
      textInput?.setAttribute('hidden', '');

      edit(selector)({ dataId, text: textInput?.value, completed: dataCompleted.checked });
    }
  };

  const onEdit = (event: Event) => {
    const item = getParentItem(event);
    const textInput = item?.querySelector('[data-text-input]') as HTMLInputElement;
    const dataTextElement = item?.querySelector('[data-text]');

    textInput?.removeAttribute('hidden');
    dataTextElement?.setAttribute('hidden', '');

    textInput?.focus();
    textInput?.addEventListener('keyup', saveTodo);
    textInput?.addEventListener('blur', saveTodo);
  };

  return (
    <ListItem flex-content-between success={completed} {...props}>
      <span style={{ flex: '0 0 30px' }}>
        {listen('change')(
          <input type="checkbox" checked={completed} data-completed-input />,
          saveTodo,
        )}
      </span>
      <span style={{ flex: '0 1 100%' }}>
        <input type="text" data-text-input value={text} hidden />
        <span data-text>{text}</span>
      </span>
      <span style={{ flex: '1 0 auto' }}>
        {click(<button type="button">edit</button>, onEdit)}
        {click(<button type="button">remove</button>, onRemove)}
      </span>
    </ListItem>
  );
};

export default () => {
  const mapList = each(selector);
  const initialData: Todo[] = [];

  const onAdd = () => {
    add(selector)({ text: 'New todo' });
  };

  return (
    <>
      <h1>Todo List</h1>
      {click(<button type="button">New todo</button>, onAdd)}
      <List todo-list>
        {mapList(initialData, ({ dataId, ...todo }) => (
          <TodoListItem data-id={dataId || getDataId()} {...todo} />
        ))}
      </List>
    </>
  );
};
