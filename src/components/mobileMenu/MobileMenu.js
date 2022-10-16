import React from 'react';
import { Link } from 'react-router-dom';

import userIcon from '../../assets/blankpic.svg';
import notificationsIcon from '../../assets/notifications.svg';
import profileIcon from '../../assets/profileIcon.svg';
import catalogIcon from '../../assets/catalogIcon.svg';
import faqIcon from '../../assets/faqIcon.svg';
import favIcon from '../../assets/favIcon.svg';
import quitIcon from '../../assets/quit.svg';


import './mobileMenu.scss';

const MobileMenu = ({ isActive, setIsActiveBurger }) => {
   return (
      <>
         <div
            className={`black-wrapper ${isActive ? 'active' : ''}`}
            onClick={() => setIsActiveBurger(isActiveBurger => !isActiveBurger)}>
         </div>
         <div className={`mobile-menu ${isActive ? 'active' : ''}`}>
            <div className="mobile-menu__header">
               <Link to='/profile'>
                  <img className='mobile-menu__user-icon' src={userIcon} alt="user icon" />
               </Link>
               <Link className='mobile-menu__user-name' to='/profile'>
                  User Name
               </Link>
               <img className='mobile-menu__notifications' src={notificationsIcon} alt="Notifications" />
            </div>
            <div className="mobile-menu__list">
               <Link to='/profile' className='mobile-menu__link'>
                  <div className="mobile-menu__image">
                     <img src={profileIcon} alt="Profile" />
                  </div>
                  Мой профиль
               </Link>
               <Link to='/favourites' className='mobile-menu__link'>
                  <div className="mobile-menu__image">
                     <img src={favIcon} alt="Favourite" />
                  </div>
                  Мои закладки
               </Link>
               <Link to='/catalog' className='mobile-menu__link'>
                  <div className="mobile-menu__image">
                     <img src={catalogIcon} alt="Catalog" />
                  </div>
                  Каталог
               </Link>
               <Link to='/faq' className='mobile-menu__link'>
                  <div className="mobile-menu__image">
                     <img src={faqIcon} alt="FAQ" />
                  </div>
                  FAQ
               </Link>
            </div>
            <div className="mobile-menu__quit">
               <img src={quitIcon} alt="Quit" />
               Выход
            </div>
         </div>
      </>
   )
}

export default MobileMenu