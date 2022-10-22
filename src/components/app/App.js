import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDatabase, ref, onValue } from "firebase/database";

import AppRouter from '../appRouter/AppRouter';
import Header from '../header/Header';
import MobileMenu from '../mobileMenu/MobileMenu';
import LoginForm from '../loginForm/LoginForm';
import Spinner from '../spinner/Spinner';
import { fetchUserData, setUser, setUserData } from '../../slices/globalSlice';



const App = () => {

   const dispatch = useDispatch();

   const isMobile = useSelector(state => state.global.isMobile);
   const auth = getAuth();
   const [user, loading, error] = useAuthState(auth);

   useEffect(() => {
      if (user) {
         dispatch(setUser(user))
         const db = getDatabase();
         const userRef = ref(db, 'users/' + user.uid);
         onValue(userRef, (snapshot) => {
            dispatch(setUserData(snapshot.val()))
         });
      }
   }, [user])

   if (loading) {
      return (
         <Spinner />
      )
   }

   if (error) {
      return <h1>Error</h1>
   }

   return (
      <BrowserRouter>
         <Header />
         {isMobile && <MobileMenu />}
         <LoginForm />
         <AppRouter />
      </BrowserRouter>
   )
}

export default App