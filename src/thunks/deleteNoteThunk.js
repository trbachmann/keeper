import { fetchData, createOptions } from '../utils/api';
import { setError, deleteNote, toggleLoading, setStatus } from '../actions';

export const deleteNoteThunk = (id) => {
  return async (dispatch) => {
    const url = `http://localhost:3001/api/v1/notes/${id}`;
    const options = createOptions('DELETE');
    try {
      dispatch(toggleLoading(true));
      const response = await fetchData(url, options);
      dispatch(toggleLoading(false));
      dispatch(setStatus(response.status));
      dispatch(deleteNote(id));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}