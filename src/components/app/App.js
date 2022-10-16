import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from '../appRouter/AppRouter';
import Header from '../header/Header';


const App = () => {
   return (
      <BrowserRouter>
         <Header />
         <AppRouter />
      </BrowserRouter>
   )
}

export default App