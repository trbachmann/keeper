import React from 'react';
import { shallow } from 'enzyme';
import IncompleteItem from './IncompleteItem';

describe('IncompleteItem', () => {
  let wrapper;
  const mockProps = {
    id: 'abc',
    description: 'do stuff',
    focusedListItemID: 'abc',
    handleComplete: jest.fn(),
    handleChange: jest.fn(),
    handleItemDelete: jest.fn()
  }
  beforeEach(() => {
    wrapper = shallow(<IncompleteItem {...mockProps} />);
  });

  it('should map the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleComplete when uncheckedicon is clicked', () => {
    wrapper.find('.NoteForm--icon--unchecked').simulate('click');
    expect(mockProps.handleComplete).toHaveBeenCalledWith('abc');
  });

  it('should call handleItemDelete when deleteicon is clicked', () => {
    wrapper.find('.NoteForm--icon--delete').simulate('click');
    expect(mockProps.handleItemDelete).toHaveBeenCalledWith('abc');
  });

  it('should call handleChange when the input is changed', () => {
    wrapper.find('.NoteForm--list-item').simulate('change');
    expect(mockProps.handleChange).toHaveBeenCalled();
  });
});