import React from 'react';
import { shallow } from 'enzyme';
import { NoteContainer, mapStateToProps } from './NoteContainer';
import { mockNotes } from '../../mockNotes';

describe('NoteContainer', () => {
  it('should match the snapshot', () => {
    let wrapper = shallow(<NoteContainer notes={mockNotes} isLoading={false}/>)
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
    const expected = { notes: mockNotes, isLoading: false };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });
});