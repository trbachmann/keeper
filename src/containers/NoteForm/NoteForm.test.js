import React from 'react';
import { shallow } from 'enzyme';
import { NoteForm, mapStateToProps, mapDispatchToProps } from './NoteForm';
import { mockNote, mockUpdatedNote, mockNotes } from '../../mockNotes';
import { deleteNoteThunk } from '../../thunks/deleteNoteThunk';
import { putNote } from '../../thunks/putNote';
import { postNote } from '../../thunks/postNote';
import { setStatus } from '../../actions';

jest.mock('shortid', () => ({ generate: jest.fn(() => '') }));
jest.mock('../../thunks/deleteNoteThunk.js');
jest.mock('../../thunks/putNote.js');
jest.mock('../../thunks/postNote.js');

describe('NoteForm', () => {
  let wrapper;
  let wrapperNewNote;
  const { id, title, listItems } = mockNote;
  const mockMatch = { params: { id }, path: `/notes/${id}` }
  const mockMatchNewNote = { params: {}, path: '/new-note' }
  const mockProps = {
    match: mockMatch,
    title,
    listItems,
    status: 0,
    deleteNoteThunk: jest.fn(() => true),
    putNote: jest.fn(() => true),
    postNote: jest.fn(() => true),
    setStatus: jest.fn(() => true)
  }
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
  const completedListItem = {
    id: 'lpo',
    description: '20 situps',
    isComplete: true
  }
  
  beforeEach(() => {
    wrapper = shallow(<NoteForm {...mockProps}/>);
    wrapperNewNote = shallow(<NoteForm {...mockPropsNewNote}/>);
  });

  it('should have default state', () => {
    expect(wrapperNewNote.state()).toEqual({
      title: '',
      listItems: [],
      focusedListItemID: null
    });
  });

  it('should match the snapshot when the path is /new-note', () => {
    expect(wrapperNewNote).toMatchSnapshot();
  });

  it('should match the snapshot when the path is /notes/:id', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when 200 < status < 300', () => {
    wrapper = shallow(<NoteForm {...mockProps} status={200} />);
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
      wrapper.setState({ listItems });
      const incomplete = '.NoteForm--span--incomplete';
      const complete = '.NoteForm--span--complete';
      const result = wrapper.instance().getListItems();
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
      const result = wrapper.instance().getTitleInput();
      const wrapperInput = shallow(result);
      const inputClass = '.NoteForm--title';
      expect(wrapperInput.find(inputClass)).toHaveLength(1);
      expect(wrapperInput.find('[value="Workout"]')).toHaveLength(1);
    });

    it('should set state if the title input changes', () => {
      const mockEvent = { target: { value: 'A' } };
      wrapperNewNote.find('.NoteForm--title').simulate('change', mockEvent);
      expect(wrapperNewNote.state('title')).toEqual('A');
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

  describe('handleComplete', () => {
    it('should set state with updated list items', () => {
      const expected = [completedListItem, listItems[1]];
      wrapper.instance().handleComplete('lpo');
      expect(wrapper.state('listItems')).toEqual(expected);
    });
  });

  describe('handleItemDelete', () => {
    it('should set state with remaining list items', () => {
      const expected = [listItems[1]];
      wrapper.instance().handleItemDelete('lpo');
      expect(wrapper.state('listItems')).toEqual(expected);
    });
  });

  describe('handleNoteDelete', () => {
    it('should call deleteNoteThunk with the correct param', async () => {
      wrapper.instance().handleNoteDelete();
      expect(mockProps.deleteNoteThunk).toHaveBeenCalledWith(id);
    });

    it('should call setStatus with the correct param', () => {
      wrapper.instance().handleNoteDelete();
      expect(mockProps.setStatus).toHaveBeenCalledWith(0);
    });
  });

  describe('handleSubmit', () => {
    it('should call putNote if there is an id', () => {
      wrapper.instance().handleSubmit();
      expect(mockProps.putNote).toHaveBeenCalledWith(mockNote);
    });

    it('should call postNote if there is not an id', () => {
      const expected = { title: 'new note', listItems: [] };
      wrapperNewNote.instance().setState(expected);
      wrapperNewNote.instance().handleSubmit();
      expect(mockProps.postNote).toHaveBeenCalledWith(expected);
    });

    it('should call setStatus with the correct param', () => {
      wrapper.instance().handleSubmit();
      expect(mockProps.setStatus).toHaveBeenCalledWith(0);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with a status property', () => {
      const mockState = {
          notes: mockNotes,
          isLoading: false,
          error: '',
          status: 0
      };
      const expected = { status: 0 };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();

    it('should call dispatch with a setStatus action', () => {
      const actionToDispatch = setStatus(204);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setStatus(204);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a deleteNoteThunk thunk', () => {
      const actionToDispatch = deleteNoteThunk('lpo');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deleteNoteThunk('lpo');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a postNote thunk', () => {
      const actionToDispatch = postNote(mockNote);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.postNote(mockNote);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a putNote thunk', () => {
      const actionToDispatch = putNote(mockNote);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.putNote(mockNote);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});