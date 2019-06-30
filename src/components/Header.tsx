import React from 'react';
import { Link, LinkGetProps, LinkProps } from '@reach/router';
import useAuth from '../context/auth';
import { IUser } from '../types';
import { APP_NAME } from '../utils';

export default function Header() {
  const {
    state: { user },
  } = useAuth();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          {APP_NAME}
        </Link>
        {user ? <LoggedInView user={user} /> : <LoggedOutView />}
      </div>
    </nav>
  );
}

const LoggedInView = ({ user: { username, image } }: { user: IUser }) => (
  <ul className="nav navbar-nav pull-xs-right">
    <li className="nav-item">
      <NavLink to="/">Home</NavLink>
    </li>

    <li className="nav-item">
      <NavLink to="/editor">
        <i className="ion-compose" />
        &nbsp;New Post
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink to="/settings">
        <i className="ion-gear-a" />
        &nbsp;Settings
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink to={`/${username}`}>
        {image && <img src={image} className="user-pic" alt={username} />}
        {username}
      </NavLink>
    </li>
  </ul>
);

const LoggedOutView = () => (
  <ul className="nav navbar-nav pull-xs-right">
    <li className="nav-item">
      <NavLink to="/">Home</NavLink>
    </li>

    <li className="nav-item">
      <NavLink to="/login">Sign in</NavLink>
    </li>

    <li className="nav-item">
      <NavLink to="/register">Sign up</NavLink>
    </li>
  </ul>
);

const NavLink = (props: LinkProps<{}>) => (
  // @ts-ignore
  <Link getProps={isActive} {...props} />
);

const isActive = ({ isCurrent }: LinkGetProps) => {
  return isCurrent
    ? { className: 'nav-link active' }
    : { className: 'nav-link' };
};
