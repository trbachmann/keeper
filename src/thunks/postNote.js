import { fetchData, createOptions } from '../utils/api';
import { addNote, setError, toggleLoading, setStatus } from '../actions';

export const postNote = (note, user) => {
  return async (dispatch) => {
    const { title, listItems, color } = note;
    const url = 'https://keeper-turing-api.herokuapp.com/api/v1/notes/';
    const options = createOptions('POST', { title, listItems, color, user });
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