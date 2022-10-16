import { useMemo } from "react"

export const useMobile = () => {
   const isMobile = useMemo(() => {
      if (window.innerWidth <= 744) {
         return true
      } else {
         return false
      }
   }, [window.innerWidth])

   return {
      isMobile,
   }
}