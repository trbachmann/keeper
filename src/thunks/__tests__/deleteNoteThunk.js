import { deleteNoteThunk } from '../deleteNoteThunk';
import { setError, deleteNote, toggleLoading } from '../../actions';

describe('deleteNoteThunk', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
  });

  it('calls mockDispatch with the deleteNoteThunk action', () => {
    const thunk = deleteNoteThunk('iau');
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(true));
  });

  it('should dispatch toggleLoading with false if the response is okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 204
    }));
    const thunk = deleteNoteThunk('ads');
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(false));
  });

  it('should dispatch deleteNote with an id if the response is okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 204
    }));
    const thunk = deleteNoteThunk('sfe');
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(deleteNote('sfe'));
  });

  it('should dispatch setError with a message if the response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.resolve('Note not found')
    }));
    const thunk = deleteNoteThunk('sfe');
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Note not found'));
  });
});