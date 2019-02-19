import { fetchData, createOptions } from '../utils/api';
import { setNotes, setError, toggleLoading, setStatus } from '../actions';

export const putAllNotes = (notes) => {
  return async (dispatch) => {
    const url = 'http://localhost:3001/api/v1/notes';
    const options = createOptions('PUT', { notes });
    try {
      dispatch(toggleLoading(true));
      const response = await fetchData(url, options);
      dispatch(toggleLoading(false));
      dispatch(setNotes(notes));
      dispatch(setStatus(response.status));
    } catch(error) {
      dispatch(setError(error.message));
    }
  }
}