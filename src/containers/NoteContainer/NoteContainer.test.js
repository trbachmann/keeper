import React from 'react';
import { shallow } from 'enzyme';
import { NoteContainer, mapStateToProps } from './NoteContainer';
import { mockNotes } from '../../mockNotes';

describe('NoteContainer', () => {
  const mockProps = {
    notes: mockNotes,
    isDisabled: false
  }

  it('should match the snapshot', () => {
    let wrapper = shallow(<NoteContainer {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when isDisabled is true', () => {
    let wrapper = shallow(<NoteContainer {...mockProps} isDisabled={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('mapStateToProps', () => {
  it('should return props with notes and isLoading', () => {
    const mockState = {
        notes: mockNotes,
        isLoading: false,
        error: '',
        status: 0
    };
    const expected = { notes: mockNotes };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });
});