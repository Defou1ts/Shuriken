import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';

import {
   PROFILE_ROUTE,
   FAVOURITES_ROUTE,
   CATALOG_ROUTE,
   LOGIN_ROUTE
} from '../../utils/consts';

import './header.scss';
import logo from '../../assets/logo.svg';
import favourites from '../../assets/myfavorites.svg';
import profile from '../../assets/profile.svg';

import SearchInput from '../searchInput/SearchInput';
import MobileMenu from '../mobileMenu/MobileMenu';


const Header = () => {

   const [isActiveBurger, setIsActiveBurger] = useState(false);
   const { isMobile } = useMobile();
   const user = false;

   useEffect(() => {
      isActiveBurger ? document.body.style = `overflow:hidden` : document.body.style = ``;
   }, [isActiveBurger]);

   return (
      <>
         <header className='header'>
            <div className="container">
               <div className="header__body">
                  <div
                     className={`header__burger ${isActiveBurger ? 'active' : ''}`}
                     onClick={() => setIsActiveBurger(isActiveBurger => !isActiveBurger)}>
                     <span></span>
                  </div>
                  <Link to='/' className="header__logo">
                     <img src={logo} alt="Shuriken logo" />
                     丂huriken
                  </Link>
                  <nav className="header__menu">
                     <div className="header__list">
                        <Link className='header__link' to={CATALOG_ROUTE}>Каталог</Link>
                        {!isMobile && <SearchInput />}
                        {user ?
                           (
                              <Link className='header__link' to={FAVOURITES_ROUTE}>
                                 <img src={favourites} alt='favourites icon' />
                              </Link>
                           )
                           : null
                        }
                        <Link className='header__link' to={PROFILE_ROUTE}>
                           <img src={profile} alt='profile icon' />
                        </Link>
                     </div>
                  </nav>
               </div>
               {isMobile && <SearchInput />}
            </div>
            {isMobile && <MobileMenu setIsActiveBurger={setIsActiveBurger} isActive={isActiveBurger} />}
         </header>

      </>
   )
}

export default Header