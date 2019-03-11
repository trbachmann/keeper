import { putNote } from '../putNote';
import * as api from '../../utils/api';
import { toggleLoading, updateNote, setStatus, setError } from '../../actions';
import { mockNote } from '../../mockNotes';

describe('putNote', () => {
  const mockDispatch = jest.fn();
  const { id, title, listItems } = mockNote;
  const mockOptions = {
    method: 'PUT',
    body: JSON.stringify({ title, listItems })
  };
  const thunk = putNote(mockNote);
  const mockUrl = `https://keeper-turing-api.herokuapp.com/api/v1/notes/${id}`;

  beforeEach(() => {
    api.fetchData = jest.fn(() => Promise.resolve({
      status: 204,
      ok: true
    }));

    api.createOptions = jest.fn(() => mockOptions);
  });

  it('should dispatch toggleLoading with true', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(true))
  });
  
  it('should call fetchData with the correct params', async () => {
    await thunk(mockDispatch);
    expect(api.fetchData).toHaveBeenCalledWith(mockUrl, mockOptions);
  });

  it('should dispatch toggleLoading with false', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(false));
  });

  it('should dispatch updateNote with the note', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(updateNote(mockNote));
  });

  it('should dispatch setStatus with the status', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setStatus(204));
  });

  it('should dispatch setError with the message', async () => {
    api.fetchData = jest.fn(() => { throw new Error('Too bad for you') });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Too bad for you'));
  });
});