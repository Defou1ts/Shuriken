

export const useHttp = () => {

   const request = async (url, method = "GET", body = null) => {
      try {
         const response = await fetch(url, {
            method, body, headers: {
               "Content-Type": "text/plain;charset=UTF-8"
            }
         })

         if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status ${response.status}`)
         }

         const data = await response.json();
         return data;

      } catch (e) {
         throw e;
      }
   }

   return {
      request,
   }
}