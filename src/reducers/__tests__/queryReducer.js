import { queryReducer } from '../queryReducer';
import { setQuery } from '../../actions';

describe('queryReducer', () => {
  it('should return the default state', () => {
    const expected = '';
    const result = queryReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return state with the new query', () => {
    const query = 'doge';
    const initialState = '';
    const result = queryReducer(initialState, setQuery(query));
    expect(result).toEqual(query);
  });
});