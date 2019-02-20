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
  let wrapperForQuery;
  beforeEach(() => {
    wrapper = shallow(<NoteContainer {...mockProps} />);
    wrapperForQuery = shallow(<NoteContainer {...mockPropsWithQuery} />);
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

  it.skip('should return filtered notes if there is a query', () => {
    const result = wrapperForQuery.instance().getNotesToDisplay();
    const expected = [ mockNotes[0] ];
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