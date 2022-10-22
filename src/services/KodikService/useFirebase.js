import { getDatabase, ref, onValue } from "firebase/database";

const useFirebase = () => {

   const getUserData = async (userId) => {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + userId);
      let resp = null;
      onValue(userRef, (snapshot) => {
         console.log(snapshot.val())
         resp = snapshot.val()
      });
   }

   return {
      getUserData
   }
}

export default useFirebase;