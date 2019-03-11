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
  const mockUser = { displayName: 'Jeo', email: 'jeo@email.com', uid: 'qwerty' };
  const { id, title, listItems, color } = mockNote;
  const mockMatch = { params: { id }, path: `/notes/${id}` }
  const mockMatchNewNote = { params: {}, path: '/new-note' }
  const mockProps = {
    match: mockMatch,
    title,
    listItems,
    color,
    status: 0,
    user: mockUser,
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
      focusedListItemID: 'title',
      color: 'white',
      showColorOptions: false
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
      expect(wrapper.state('color')).toEqual(color);      
    });
  });
  
  describe('componentWillUnmount', () => {
    it('should dispatch setStatus with 0', () => {
      wrapper.instance().componentWillUnmount();
      expect(mockProps.setStatus).toHaveBeenCalledWith(0);
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

  describe('getIncompleteListItems', () => {
    it('should return an array of IncompleteItems', () => {
      const { listItems } = mockUpdatedNote;
      wrapper.setState({ listItems });
      const incomplete = '.NoteForm--span--incomplete';
      const result = wrapper.instance().getIncompleteListItems();
      const wrapperIndex0 = shallow(result[0]);
      expect(wrapperIndex0.find(incomplete)).toHaveLength(1);
    });
  });

  describe('getCompleteListItems', () => {
    it('should return an array of CompleteItems', () => {
      const { listItems } = mockUpdatedNote;
      wrapper.setState({ listItems });
      const complete = '.NoteForm--span--complete';
      const result = wrapper.instance().getCompleteListItems();
      const wrapperIndex0 = shallow(result[0]);
      expect(wrapperIndex0.find(complete)).toHaveLength(1);
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

  describe('handleColorChoice', () => {
    it('should set state with a new color', () => {
      expect(wrapper.state('color')).toEqual('lavender');
      const mockEvent = { target: { id: 'blue' }, preventDefault: jest.fn() };
      wrapper.instance().handleColorChoice(mockEvent);
      expect(wrapper.state('color')).toEqual('blue');
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

  describe('handleKeydown', () => {
    it('should dispatch setStatus with 200 if Escape is pressed', () => {
      const mockEvent = { key: 'Escape' };
      wrapper.instance().handleKeydown(mockEvent);
      expect(mockProps.setStatus).toHaveBeenCalledWith(200);
    });
  });

  describe('handleNoteDelete', () => {
    const mockEvent = { preventDefault: jest.fn() };
    it('should call deleteNoteThunk with the correct param', async () => {
      wrapper.instance().handleNoteDelete(mockEvent);
      expect(mockProps.deleteNoteThunk).toHaveBeenCalledWith(id, mockUser);
    });
  });

  describe('handleSubmit', () => {
    const mockEvent = { preventDefault: jest.fn() };
    it('should call putNote if there is an id', () => {
      wrapper.instance().handleSubmit(mockEvent);
      expect(mockProps.putNote).toHaveBeenCalledWith(mockNote, mockUser);
    });

    it('should call postNote if there is not an id', () => {
      const expected = { title: 'new note', listItems: [], color: 'green' };
      wrapperNewNote.instance().setState(expected);
      wrapperNewNote.instance().handleSubmit(mockEvent);
      expect(mockProps.postNote).toHaveBeenCalledWith(expected, mockUser);
    });
  });

  describe('toggleShowColorOptions', () => {
    it('should toggle showColorOptions in state', () => {
      expect(wrapper.state('showColorOptions')).toEqual(false);
      wrapper.instance().toggleShowColorOptions();
      expect(wrapper.state('showColorOptions')).toEqual(true);      
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