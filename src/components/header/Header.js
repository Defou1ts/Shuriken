import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { setIsMobile, setIsActiveBurger, setShowLoginForm } from '../../slices/globalSlice';

import {
   PROFILE_ROUTE,
   FAVOURITES_ROUTE,
   CATALOG_ROUTE,
} from '../../utils/consts';

import './header.scss';
import logo from '../../assets/logo.svg';
import favourites from '../../assets/myfavorites.svg';
import profile from '../../assets/profile.svg';

import SearchInput from '../searchInput/SearchInput';

const Header = () => {

   const dispatch = useDispatch();
   const isActiveBurger = useSelector(state => state.global.isActiveBurger);
   const showLoginForm = useSelector(state => state.global.showLoginForm);
   const user = useSelector(state => state.global.user);
   const isMobile = useMemo(() => {
      return window.innerWidth <= 744 ? true : false
   }, [window.innerWidth])

   useEffect(() => {
      dispatch(setIsMobile(isMobile));
   }, [isMobile])

   useEffect(() => {
      isActiveBurger || (showLoginForm && !isMobile) ? document.body.style = `overflow:hidden` : document.body.style = ``;
   }, [isActiveBurger, showLoginForm]);

   return (
      <>
         <header className='header'>
            <div className="container">
               <div className="header__body">
                  <div
                     className={`header__burger ${isActiveBurger ? 'active' : ''}`}
                     onClick={() => dispatch(setIsActiveBurger(!isActiveBurger))}>
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
                              <>
                                 <Link className='header__link' to={FAVOURITES_ROUTE}>
                                    <img src={favourites} alt='favourites icon' />
                                 </Link>
                                 <Link to={PROFILE_ROUTE} className='header__link'>
                                    <img src={profile} alt='profile icon' />
                                 </Link>
                              </>
                           )
                           :
                           (
                              <div onClick={() => dispatch(setShowLoginForm(!showLoginForm))} className='header__link'>
                                 <img src={profile} alt='profile icon' />
                              </div>
                           )
                        }
                     </div>
                  </nav>
               </div>
               {isMobile && <SearchInput />}
            </div>
         </header>
      </>
   )
}

export default Header