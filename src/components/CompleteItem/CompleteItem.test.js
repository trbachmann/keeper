import React from 'react';
import { shallow } from 'enzyme';
import CompleteItem from './CompleteItem';

describe('CompleteItem', () => {
  let wrapper;
  const mockProps = {
    id: 'eia',
    description: 'Get groceries',
    handleComplete: jest.fn(),
    handleItemDelete: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(
      <CompleteItem {...mockProps} />
    );
  });

  it('should pass snapshot test', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleComplete passing in the id', () => {
    wrapper.find('.NoteForm--icon--checked').simulate('click');
    expect(mockProps.handleComplete).toHaveBeenCalledWith('eia');
  });

  it('should call handleItemDelete passing in the id', () => {
    wrapper.find('.NoteForm--icon--delete').simulate('click');
    expect(mockProps.handleItemDelete).toHaveBeenCalledWith('eia');
  });
});