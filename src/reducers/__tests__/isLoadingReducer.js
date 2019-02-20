import { isLoadingReducer } from '../isLoadingReducer';
import * as actions from '../../actions';

describe('isLoadingReducer', () => {
  it('should return the default state', () => {
    const expected = false;
    const result = isLoadingReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return the state with a new boolean', () => {
    const expected = true;
    const result = isLoadingReducer(undefined, actions.toggleLoading(expected));
    expect(result).toEqual(expected);
  });
});