import { setNotes, setError, toggleLoading, setUser } from '../actions';
import { fetchData, createOptions } from '../utils/api';

export const fetchUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      const { displayName, email, uid } = userData;
      const user = { displayName, email, uid };
      const url = 'https://api.keeper-turing.com/api/v1/users';
      const options = createOptions('POST', user);
      const response = await fetchData(url, options);
      const { notes } = await response.json();
      dispatch(toggleLoading(false));
      dispatch(setUser(user));
      dispatch(setNotes(notes));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}