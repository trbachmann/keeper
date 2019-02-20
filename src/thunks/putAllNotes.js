import { fetchData, createOptions } from '../utils/api';
import { setNotes, setError, toggleLoading } from '../actions';

export const putAllNotes = (notes) => {
  return async (dispatch) => {
    const url = 'http://localhost:3001/api/v1/notes';
    const options = createOptions('PUT', { notes });
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