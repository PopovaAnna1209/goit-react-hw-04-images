import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <InfinitySpin 
  width='200'
  color="#1294a5"
/>
    </div>
  );
};
