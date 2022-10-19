import Slider from '../components/slider/Slider';
import NewAnimeList from '../components/newAnimeList/NewAnimeList';

const Homepage = () => {
   return (
      <>
         <Slider />
         <div className="container">
            <NewAnimeList />
         </div>
      </>
   )
}

export default Homepage;