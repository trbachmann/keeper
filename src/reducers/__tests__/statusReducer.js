import { statusReducer } from '../statusReducer';
import { setStatus } from '../../actions';

describe('statusReducer', () => {
  it('should return the default state of 0', () => {
    const result = statusReducer(undefined, {});
    expect(result).toEqual(0);
  });

  it('should return a code when called with SET_STATUS action', () => {
    const initialState = 0;
    const result = statusReducer(initialState, setStatus(201));
    expect(result).toEqual(201);
  });
});