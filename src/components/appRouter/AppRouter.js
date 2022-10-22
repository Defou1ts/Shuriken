import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';

import {
   publicRoutes,
   privateRoutes,
   generalRoutes
} from '../../utils/routes';

import {
   HOMEPAGE_ROUTE,
   LOGIN_ROUTE,
   PROFILE_ROUTE
} from '../../utils/consts';

import Spinner from '../spinner/Spinner';

function AppRouter() {

   const user = useSelector(state => state.global.user);

   const renderRoutes = (arr) => arr
      .map(({ path, Component }) => (<Route key={path} path={path} element={Component} />));

   const renderedPublicRoutes = renderRoutes(publicRoutes);
   const renderedPrivateRoutes = renderRoutes(privateRoutes);
   const renderedGeneralRoutes = renderRoutes(generalRoutes);

   return user ?
      (
         <Routes fallback={<Spinner />}>
            {renderedGeneralRoutes}
            {renderedPrivateRoutes}
            <Route path={LOGIN_ROUTE} element={< Navigate to={PROFILE_ROUTE} replace />} />
            <Route path='*' element={< Navigate to={HOMEPAGE_ROUTE} replace />} />
         </Routes>
      )
      :
      (
         <Routes fallback={<Spinner />}>
            {renderedGeneralRoutes}
            {renderedPublicRoutes}
            <Route path={PROFILE_ROUTE} element={< Navigate to={LOGIN_ROUTE} replace />} />
            <Route path='*' element={< Navigate to={HOMEPAGE_ROUTE} replace />} />
         </Routes>
      )
}

export default AppRouter;
