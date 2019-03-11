import { userReducer } from '../userReducer';
import { setUser } from '../../actions';

describe('userReducer', () => {
  it('should return the default state', () => {
    const result = userReducer(undefined, {});
    const expected = null;
    expect(result).toEqual(expected);
  });

  it('should return a user', () => {
    const mockUser = { displayName: 'Jeo', email: 'jeo@email.com', uid: 'qwerty' };
    const initialState = null;
    const mockAction = setUser(mockUser);
    const result = userReducer(initialState, mockAction);
    expect(result).toEqual(mockUser);
  });
});