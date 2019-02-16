import { deleteNoteThunk } from '../deleteNoteThunk';
import { setError, deleteNote, toggleLoading, setStatus } from '../../actions';
import * as api from '../../utils/api';

describe('deleteNoteThunk', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    api.fetchData = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 204
    }));
  });

  it('should dispatch toggleLoading with true', () => {
    const thunk = deleteNoteThunk('iau');
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(true));
  });

  it('should dispatch toggleLoading with false if the response is okay', async () => {
    const thunk = deleteNoteThunk('ads');
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(false));
  });

  it('should dispatch setStatus with the response status if the response is okay', async () => {
    const thunk = deleteNoteThunk('djs');
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setStatus(204));
  })

  it('should dispatch deleteNote with an id if the response is okay', async () => {
    const thunk = deleteNoteThunk('sfe');
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(deleteNote('sfe'));
  });

  it('should dispatch setError with a message if the response is not okay', async () => {
    api.fetchData = jest.fn().mockImplementation(() => {throw new Error('Note not found')});
    const thunk = deleteNoteThunk('sfe');
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Note not found'));
  });
});