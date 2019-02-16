import { fetchData, createOptions } from '../utils/api';
import { addNote, setError, toggleLoading, setStatus } from '../actions';

export const postNote = (note) => {
  return async (dispatch) => {
    const { title, listItems } = note;
    const url = 'http://localhost:3001/api/v1/notes/';
    const options = createOptions('POST', { title, listItems });
    try {
      dispatch(toggleLoading(true));
      const response = await fetchData(url, options);
      const note = await response.json();
      dispatch(toggleLoading(false));
      dispatch(addNote(note));
      dispatch(setStatus(response.status));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}