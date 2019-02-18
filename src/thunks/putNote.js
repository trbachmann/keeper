import { fetchData, createOptions } from '../utils/api';
import { setError, updateNote, toggleLoading, setStatus } from '../actions';

export const putNote = (note) => {
  const { id, title, listItems, color } = note;
  return async (dispatch) => {
    const url = `http://localhost:3001/api/v1/notes/${id}`;
    const options = createOptions('PUT', { title, listItems, color });
    try {
      dispatch(toggleLoading(true));
      const response = await fetchData(url, options);
      dispatch(toggleLoading(false));
      dispatch(updateNote(note));
      dispatch(setStatus(response.status));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}