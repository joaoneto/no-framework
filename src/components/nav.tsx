import { Link } from '@/lib/router';
import './nav.css';

interface NavProps {
  // @todo: fix children types
  children?: JSX.Element[];
}

function Nav({ children }: NavProps) {
  return (
    <nav className="nav" primary primary-text>
      <ul className="nav__list" flex flex-content-start flex-align-center m-0 p-0>
        {children}
      </ul>
    </nav>
  );
}

interface NavItemProps {
  to?: string;
  // @todo: fix children types
  children?: string;
}

export function NavItem({ children, to }: NavItemProps) {
  return (
    <li className="nav__item">
      {to ? (
        <Link to={to} className="nav__link" primary-text pr-2>
          {children}
        </Link>
      ) : (
        children
      )}
    </li>
  );
}

export default Nav;
