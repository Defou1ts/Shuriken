import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '../../utils/routes';
import { HOMEPAGE_ROUTE } from '../../utils/consts';

function AppRouter() {

   const user = true;

   const renderRoutes = (arr) => arr
      .map(({ path, Component }) => (<Route key={path} path={path} element={Component} />));

   const renderedPublicRoutes = renderRoutes(publicRoutes);
   const renderedPrivateRoutes = renderRoutes(privateRoutes);

   return user ?
      (
         <Routes>
            {renderedPublicRoutes}
            {renderedPrivateRoutes}
            < Route path='*' element={< Navigate to={HOMEPAGE_ROUTE} replace />} />
         </Routes>
      )
      :
      (
         <Routes>
            {renderedPublicRoutes}
            < Route path='*' element={< Navigate to={HOMEPAGE_ROUTE} replace />} />
         </Routes>
      )
}

export default AppRouter;
