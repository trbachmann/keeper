import React from 'react';
import { shallow } from 'enzyme';
import { SearchBar, mapDispatchToProps } from '../SearchBar/SearchBar';
import { setQuery } from '../../actions';

describe('SearchBar', () => {
  describe('SearchBar component', () => {
    let wrapper;
    const mockSetQuery = jest.fn();

    beforeEach(() => {
      wrapper = shallow(<SearchBar setQuery={mockSetQuery} />);
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call setQuery with the query on change', () => {
      const mockEvent = { target: { value: 'hey' } };
      wrapper.find('.SearchBar--input').simulate('change', mockEvent);
      expect(mockSetQuery).toHaveBeenCalledWith('hey');
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with setQuery', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setQuery('note to find');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setQuery('note to find');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
}); 