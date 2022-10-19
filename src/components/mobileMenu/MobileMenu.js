import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
   PROFILE_ROUTE,
   LOGIN_ROUTE,
   FAVOURITES_ROUTE,
   FAQ_ROUTE,
   CATALOG_ROUTE
} from '../../utils/consts';

import userIcon from '../../assets/blankpic.svg';
import notificationsIcon from '../../assets/notifications.svg';
import profileIcon from '../../assets/profileIcon.svg';
import catalogIcon from '../../assets/catalogIcon.svg';
import faqIcon from '../../assets/faqIcon.svg';
import favIcon from '../../assets/favIcon.svg';
import quitIcon from '../../assets/quit.svg';


import './mobileMenu.scss';

const MobileMenu = ({ isActive, setIsActiveBurger }) => {

   const user = false;
   const location = useLocation();

   useEffect(() => {
      setIsActiveBurger(false);
   }, [location.key])


   return (
      <>
         <div
            className={`black-wrapper ${isActive ? 'active' : ''}`}
            onClick={() => setIsActiveBurger(false)}>
         </div>
         <div className={`mobile-menu ${isActive ? 'active' : ''}`}>
            <div className="mobile-menu__header">
               {user ?
                  (<>
                     <Link to={PROFILE_ROUTE}>
                        <img
                           className='mobile-menu__user-icon'
                           src={userIcon}
                           alt="user icon" />
                     </Link>
                     <Link className='mobile-menu__user-name' to={PROFILE_ROUTE}>
                        User Name
                     </Link>
                     <img className='mobile-menu__notifications' src={notificationsIcon} alt="Notifications" />
                  </>)
                  :
                  (
                     <Link className='mobile-menu__login-btn' to={LOGIN_ROUTE}>
                        Войти
                     </Link>
                  )
               }
            </div>
            <div className="mobile-menu__list">
               {user ?
                  (
                     <>
                        <Link to={PROFILE_ROUTE} className='mobile-menu__link'>
                           <div className="mobile-menu__image">
                              <img src={profileIcon} alt="Profile" />
                           </div>
                           Мой профиль
                        </Link>
                        <Link to={FAVOURITES_ROUTE} className='mobile-menu__link'>
                           <div className="mobile-menu__image">
                              <img src={favIcon} alt="Favourite" />
                           </div>
                           Мои закладки
                        </Link>
                     </>
                  )
                  : null
               }
               <Link to={CATALOG_ROUTE} className='mobile-menu__link'>
                  <div className="mobile-menu__image">
                     <img src={catalogIcon} alt="Catalog" />
                  </div>
                  Каталог
               </Link>
               <Link to={FAQ_ROUTE} className='mobile-menu__link'>
                  <div className="mobile-menu__image">
                     <img src={faqIcon} alt="FAQ" />
                  </div>
                  FAQ
               </Link>
            </div>
            {user ?
               (
                  <div className="mobile-menu__quit">
                     <img src={quitIcon} alt="Quit" />
                     Выход
                  </div>
               )
               : null
            }
         </div>
      </>
   )
}

export default MobileMenu