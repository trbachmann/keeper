import { fetchUser } from '../fetchUser';
import { toggleLoading, setNotes, setError } from '../../actions';
import * as api from '../../utils/api';
import { mockNotes } from '../../mockNotes';

describe('fetchUser', () => {
  const mockDispatch = jest.fn();
  const mockUser = { displayName: 'Jeo', email: 'jeo@email.com', uid: 'qwerty' };
  const thunk = fetchUser(mockUser);
  const mockUrl = 'https://keeper-turing-api.herokuapp.com/api/v1/users';
  const mockOptions = {
    method: 'POST',
    body: JSON.stringify(mockUser),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  beforeEach(() => {
    api.fetchData = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ notes: mockNotes }),
      ok: true
    }))
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