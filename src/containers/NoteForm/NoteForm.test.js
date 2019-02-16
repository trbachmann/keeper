import React from 'react';
import { shallow } from 'enzyme';
import { NoteForm } from './NoteForm';
import { mockNote, mockUpdatedNote } from '../../mockNotes';

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

  describe('componentDidMount', () => {
    it('should set state when path is not /new-note', () => {
      expect(wrapper.state('title')).toEqual(title);
      expect(wrapper.state('listItems')).toEqual(listItems);
    });
  });

  describe('createListItem', () => {
    it('should return a listItem', () =>{
      const expected = {
        id: 'fakeid',
        description: 'do stuff',
        isComplete: false
      }
      const result = wrapper.instance().createListItem('fakeid', 'do stuff');
      expect(result).toEqual(expected);
    });
  });

  describe('editListItem', () => {
    it('should return an updated array of listItems', () => {
      const updatedListItem = {
        id: 'lpo',
        description: 'eat',
        isComplete: false
      }
      const expected = [updatedListItem, listItems[1]];
      const result = wrapper.instance().editListItems(listItems, 'lpo', 'eat');
      expect(result).toEqual(expected);
    });
  });
});