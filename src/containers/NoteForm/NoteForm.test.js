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
  const newListItem = {
    id: 'newid',
    description: 'new description',
    isComplete: false
  }
  const updatedListItem = {
    id: 'lpo',
    description: 'eat',
    isComplete: false
  }
  
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
      const { id, description } = newListItem;
      const result = wrapper.instance().createListItem(id, description);
      expect(result).toEqual(newListItem);
    });
  });

  describe('editListItem', () => {
    it('should return an updated array of listItems', () => {
      const expected = [updatedListItem, listItems[1]];
      const result = wrapper.instance().editListItems(listItems, 'lpo', 'eat');
      expect(result).toEqual(expected);
    });
  });

  describe('getListItems', () => {
    it('should return an array of IncompleteItems and CompleteItems', () => {
      const { listItems } = mockUpdatedNote;
      const incomplete = '.NoteForm--span--incomplete';
      const complete = '.NoteForm--span--complete';
      const result = wrapper.instance().getListItems(listItems);
      const wrapperIndex0 = shallow(result[0]);
      const wrapperIndex1 = shallow(result[1]);
      const wrapperIndex2 = shallow(result[2]);
      expect(wrapperIndex0.find(incomplete)).toHaveLength(1);
      expect(wrapperIndex1.find(incomplete)).toHaveLength(1);
      expect(wrapperIndex2.find(complete)).toHaveLength(1);
    });
  });

  describe('getNewListItemInput', () => {
    it('should return an new listItem input element', () => {
      const result = wrapper.instance().getNewListItemInput();
      const wrapperInput = shallow(result);
      const inputClass = '.NoteForm--new-input';
      expect(wrapperInput.find(inputClass)).toHaveLength(1);
    });
  });

  describe('getTitleInput', () => {
    it('should return a title input element with the correct value', () => {
      const result = wrapper.instance().getTitleInput('note title');
      const wrapperInput = shallow(result);
      const inputClass = '.NoteForm--title';
      expect(wrapperInput.find(inputClass)).toHaveLength(1);
      expect(wrapperInput.find('[value="note title"]')).toHaveLength(1);
    });
  });

  describe('handleChange', () => {
    it('should set state if the event target is an existing list item', () => {
      const { id, description } = updatedListItem;
      const mockEvent = { target: { name: id, value: description } }
      const expected = [updatedListItem, listItems[1]];
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state('focusedListItemID')).toEqual(id);
      expect(wrapper.state('listItems')).toEqual(expected);
    });

    it('should set state if the event target is a new list item', () => {
      const { id, description } = newListItem;
      const mockEvent = { target: { name: id, value: description } }
      const expected = [...listItems, newListItem];
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state('focusedListItemID')).toEqual(id);
      expect(wrapper.state('listItems')).toEqual(expected);
    });
  });
});