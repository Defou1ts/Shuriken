import {
   HOMEPAGE_ROUTE,
   CATALOG_ROUTE,
   PROFILE_ROUTE,
   FAVOURITES_ROUTE,
   FAQ_ROUTE,
   ANIME_ROUTE,
   LOGIN_ROUTE,
   REGISTER_ROUTE
} from "../utils/consts";

import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import RegisterPage from "../pages/RegisterPage";

export const generalRoutes = [
   {
      path: HOMEPAGE_ROUTE,
      Component: <Homepage />
   },
   {
      path: CATALOG_ROUTE,
      Component: <p>Catalog</p>
   },
   {
      path: FAQ_ROUTE,
      Component: <p>FAQ</p>
   },
   {
      path: ANIME_ROUTE,
      Component: <p>Anime</p>
   },
]

export const publicRoutes = [
   {
      path: LOGIN_ROUTE,
      Component: <Loginpage />
   },
   {
      path: REGISTER_ROUTE,
      Component: <RegisterPage />
   },
]

export const privateRoutes = [
   {
      path: FAVOURITES_ROUTE,
      Component: <p>Favourite</p>
   },
   {
      path: PROFILE_ROUTE,
      Component: <p>Profile</p>
   },
]