import spinner from '../../assets/spinner.svg';

const Spinner = () => {
   return (
      <div className="spinner-wrapper">
         <img
            src={spinner}
            alt='Loading...'
            className='spinner' />
      </div>
   )
}

export default Spinner;