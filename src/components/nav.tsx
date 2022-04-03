import { Link } from '@/lib/router';
import './nav.css';

interface NavProps {
  // @todo: fix children types
  children?: JSX.Element[];
}

function Nav({ children }: NavProps) {
  return (
    <nav className="nav">
      <ul className="nav__list">{children}</ul>
    </nav>
  );
}

interface NavItemProps {
  to: string;
  // @todo: fix children types
  children?: string;
}

export function NavItem({ children, to }: NavItemProps) {
  return (
    <li className="nav__item">
      <Link to={to} className="nav__link">
        {children}
      </Link>
    </li>
  );
}

export default Nav;
