import { fetchData, createOptions } from '../utils/api';
import { setError, updateNote, toggleLoading } from '../actions';

export const putNote = (note) => {
  const { id, title, listItems } = note;
  return async (dispatch) => {
    const url = `http://localhost:3001/api/v1/notes/${id}`;
    const options = createOptions('PUT', { title, listItems });
    try {
      dispatch(toggleLoading(true));
      const response = await fetchData(url, options);
      dispatch(toggleLoading(false));
      dispatch(updateNote(note));
      return response.status;
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}