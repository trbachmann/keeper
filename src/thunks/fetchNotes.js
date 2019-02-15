import { setNotes, setError, toggleLoading } from '../actions';
import { fetchData } from '../utils/api';

export const fetchNotes = () => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      const response = await fetchData('http://localhost:3001/api/v1/notes');
      dispatch(toggleLoading(false));
      dispatch(setNotes(await response.json()));
    } catch (error) {
      dispatch(setError(error));
    }
  }
}