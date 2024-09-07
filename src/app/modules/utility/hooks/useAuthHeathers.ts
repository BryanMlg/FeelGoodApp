
import { useSelector } from 'react-redux';
import { RootState } from '../../../../setup';

export const useAuthHeaders = () => {
  const auth = useSelector((state: RootState) => state.auth); // Ajusta según tu estado global

  return {
    Authorization: `Bearer ${auth.accessToken}`,
    apikey: process.env.REACT_APP_SUPA_BASE_KEY || '', // Asegúrate de que esta variable esté definida
  };
};
