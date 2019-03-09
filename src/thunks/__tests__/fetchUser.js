import { fetchNotes } from '../fetchNotes';
import { toggleLoading, setNotes, setError } from '../../actions';
import * as api from '../../utils/api';
import { mockNotes } from '../../mockNotes';

describe('fetchNotes', () => {
  const mockDispatch = jest.fn();
  const thunk = fetchNotes();
  const mockUrl = 'http://localhost:3001/api/v1/notes';
  
  beforeEach(() => {
    api.fetchData = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockNotes),
      ok: true
    }))
  });
  
  it('should dispatch toggleLoading with true', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(true))
  });
  
  it('should call fetchData with the correct params', async () => {
    await thunk(mockDispatch);
    expect(api.fetchData).toHaveBeenCalledWith(mockUrl);
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
    api.fetchData = jest.fn(() => { throw new Error('Too bad for you') });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Too bad for you'));
  });
});