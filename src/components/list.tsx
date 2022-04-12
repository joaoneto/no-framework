import './list.css';

interface ListProps {
  className?: string;
  children: JSX.Children;
}

function List({ children, className = '', ...props }: ListProps) {
  return (
    <ul {...props} className={`list ${className}`} flex flex-column m-0 p-0>
      {children}
    </ul>
  );
}

interface ListItemProps extends JSX.ElementAttrs<Partial<HTMLLIElement>> {
  className?: string;
  children: JSX.Children;
}

export function ListItem({ children, className = '', ...props }: ListItemProps) {
  return (
    <li {...props} className={`list__item ${className}`} flex flex-align-center>
      {children}
    </li>
  );
}

export default List;
