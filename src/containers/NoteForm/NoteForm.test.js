import React from 'react';
import { shallow } from 'enzyme';
import { NoteForm } from './NoteForm';
import { mockNote } from '../../mockNotes';

jest.mock('shortid', () => ({ generate: jest.fn(() => '') }));

describe('NoteForm', () => {
  let wrapper;
  let wrapperNewNote;
  const { id, title, listItems } = mockNote;
  const mockMatch = { params: { id }, path: `/notes/${id}` }
  const mockMatchNewNote = { params: {}, path: '/new-note' }
  const mockProps = { match: mockMatch, title, listItems }
  const mockPropsNewNote = {...mockProps, match: mockMatchNewNote}

  beforeEach(() => {
    wrapper = shallow(<NoteForm {...mockProps}/>);
    wrapperNewNote = shallow(<NoteForm {...mockPropsNewNote}/>);
  });

  it('should have default state', () => {
    expect(wrapperNewNote.state()).toEqual({
      title: '',
      listItems: [],
      status: 0,
      focusedListItemID: null
    });
  });

  it('should match the snapshot when the path is /new-note', () => {
    expect(wrapperNewNote).toMatchSnapshot();
  });

  it('should match the snapshot when the path is /notes/:id', () => {
    expect(wrapper).toMatchSnapshot();
  });
});