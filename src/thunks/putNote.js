import { fetchData, createOptions } from '../utils/api';
import { setError, updateNote, toggleLoading, setStatus } from '../actions';

export const putNote = (note, user) => {
  return async (dispatch) => {
    const { id, title, listItems, color } = note;
    const url = `https://keeper-turing-api.herokuapp.com/api/v1/notes/${id}`;
    const options = createOptions('PUT', { title, listItems, color, user });
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