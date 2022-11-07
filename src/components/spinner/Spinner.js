import spinner from '../../assets/spinner.svg';

const Spinner = ({ small = false }) => {
    return (
        <div className={!small ? 'spinner-wrapper' : ''}>
            <img
                style={
                    small
                        ? {
                              width: '80px',
                              height: '80px',
                              margin: '15px 0px 15px 0px',
                          }
                        : null
                }
                src={spinner}
                alt='Loading...'
                className='spinner'
            />
        </div>
    );
};

export default Spinner;
