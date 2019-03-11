import { putAllNotes } from '../putAllNotes';
import * as api from '../../utils/api';
import { toggleLoading, setNotes, setError } from '../../actions';
import { mockNotes } from '../../mockNotes';

describe('putAllNotes', () => {
  const mockDispatch = jest.fn();
  const mockOptions = {
    method: 'PUT',
    body: JSON.stringify({ notes: mockNotes })
  };
  const thunk = putAllNotes(mockNotes);
  const mockUrl = 'https://keeper-turing-api.herokuapp.com/api/v1/notes';
  api.fetchData = jest.fn(() => Promise.resolve({
    status: 204,
    ok: true
  }));
  api.createOptions = jest.fn(() => mockOptions);

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

  it('should dispatch setNotes with notes', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setNotes(mockNotes));
  });

  it('should dispatch setError with the message', async () => {
    api.fetchData = jest.fn(() => { throw new Error('Please send notes') });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Please send notes'));
  });
});