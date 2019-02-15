import { setNotes, setError } from '../actions';
import { fetchData } from '../utils/api';

export const fetchNotes = () => {
  return async (dispatch) => {
    try {
      const response = await fetchData('http://localhost:3001/api/v1/notes');
      dispatch(setNotes(await response.json()));
    } catch (error) {
      dispatch(setError(error));
    }
  }
}