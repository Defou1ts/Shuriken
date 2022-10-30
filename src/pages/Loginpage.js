import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { setShowLoginForm } from '../slices/globalSlice';

const Loginpage = () => {
  const dispatch = useDispatch();

  dispatch(setShowLoginForm(true));

  return <></>;
};

export default Loginpage;
