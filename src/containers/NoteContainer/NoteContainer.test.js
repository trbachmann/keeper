import React from 'react';
import { shallow } from 'enzyme';
import { NoteContainer, mapStateToProps } from './NoteContainer';
import { mockNotes } from '../../mockNotes';

describe('NoteContainer', () => {
  const mockProps = {
    notes: mockNotes,
    isDisabled: false,
    query: ''
  };
  const mockPropsWithQuery = {
    notes: mockNotes,
    isDisabled: false,
    query: 'Learn'
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NoteContainer {...mockProps} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when isDisabled is true', () => {
    wrapper = shallow(<NoteContainer {...mockProps} isDisabled={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should return a NoteCard', () => {
    const result = wrapper.instance().addWelcomeNote();
    const noteCard = shallow(result);
    expect(noteCard).toMatchSnapshot();
  });

  it('should return all of the notes if there is no query', () => {
    const result = wrapper.instance().getNotesToDisplay();
    expect(result).toEqual(mockNotes);
  });
  
  it('should return filtered notes if there is a query', () => {
    const wrapper = shallow(<NoteContainer notes={mockNotes} query='redux' isDisabled={false} />);
    const result = wrapper.instance().getNotesToDisplay();
    const expected = [ mockNotes[0] ];
    console.log(result, expected)
    expect(result).toEqual(expected);
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