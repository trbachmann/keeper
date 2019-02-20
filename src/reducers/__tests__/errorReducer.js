import { errorReducer } from '../errorReducer';
import * as actions from '../../actions';

describe('errorReducer', () => {
  it('should return the default state', () => {
    const expected = '';
    const result = errorReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return the state with an error message', () => {
    const initialState = '';
    const message = 'Note not found';
    const result = errorReducer(initialState, actions.setError(message));
    expect(result).toEqual(message);
  });
});