import React from 'react';
import Link from '../../../UI/Link/Link';

const LogInNav = ({ open }) => {
  let navigationClass = 'navigation--login navigation--login--close';
  if (open) {
    navigationClass = 'navigation--login navigation--login--open'
  }

  return (
    <nav className={navigationClass}>
      <ul className="navigation--login__list">
        <li className="navigation__item"><Link class="link link--login" route="/recepies-list" exact><span>List of Recepies</span> <span className="navigation--login__icon fas fa-list-ul"></span></Link></li>
        <li className="navigation__item"><Link class="link link--login" route="/favorites"><span>Favorites</span> <span className="navigation--login__icon fas fa-star"></span></Link></li>
        <li className="navigation__item"><Link class="link link--login" route="/logout"><span>Logout</span><span className="navigation--login__icon fas fa-sign-out-alt"></span></Link></li>
      </ul>
    </nav>
  );
}

export default LogInNav;