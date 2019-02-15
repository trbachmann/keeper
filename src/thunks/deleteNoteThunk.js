import { fetchData, createOptions } from '../utils/api';
import { setError, deleteNote } from '../actions';

export const deleteNoteThunk = (id) => {
  return async (dispatch) => {
    const url = `http://localhost:3001/api/v1/notes/${id}`;
    const options = createOptions('DELETE');
    try {
      const response = await fetchData(url, options);
      dispatch(deleteNote(id));
      return response.status;
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}