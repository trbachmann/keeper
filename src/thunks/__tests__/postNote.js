import { postNote } from '../postNote';
import * as api from '../../utils/api';
import { toggleLoading, addNote, setStatus, setError } from '../../actions';
import { mockNote } from '../../mockNotes';

describe('postNote', () => {
  const mockDispatch = jest.fn();
  const { title, listItems } = mockNote;
  const mockOptions = {
    method: 'POST',
    body: JSON.stringify({ title, listItems })
  };
  const thunk = postNote(mockNote);
  const mockUrl = 'https://keeper-turing-api.herokuapp.com/api/v1/notes/';

  beforeEach(() => {
    api.fetchData = jest.fn(() => Promise.resolve({
      status: 201,
      ok: true,
      json: jest.fn(() => Promise.resolve(mockNote))
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

  it('should dispatch addNote with the note', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(addNote(mockNote));
  });

  it('should dispatch setStatus with the status', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setStatus(201));
  });

  it('should dispatch setError with the message', async () => {
    api.fetchData = jest.fn(() => { throw new Error('Too bad for you') });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Too bad for you'));
  });
});