import { fetchData, createOptions } from '../utils/api';
import { setNotes, setError, toggleLoading } from '../actions';

export const putAllNotes = (notes, user) => {
  return async (dispatch) => {
    const url = 'https://api.keeper-turing.com/api/v1/notes';
    const options = createOptions('PUT', { notes, user });
    try {
      dispatch(toggleLoading(true));
      await fetchData(url, options);
      dispatch(toggleLoading(false));
      dispatch(setNotes(notes));
    } catch(error) {
      dispatch(setError(error.message));
    }
  }
}