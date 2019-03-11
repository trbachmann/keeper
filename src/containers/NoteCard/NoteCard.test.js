import React from 'react';
import { shallow } from 'enzyme';
import { NoteCard, mapStateToProps, mapDispatchToProps } from './NoteCard';
import { setStatus } from '../../actions';
import { putAllNotes } from '../../thunks/putAllNotes';
import { putNote } from '../../thunks/putNote';
import { deleteNoteThunk } from '../../thunks/deleteNoteThunk';
import {
  mockNotes,
  mockNote,
  mockNoteLong,
  mockNoteAfterComplete,
  mockNoteAfterCompleteOpposite
} from '../../mockNotes';

jest.mock('../../thunks/putAllNotes.js');
jest.mock('../../thunks/putNote.js');
jest.mock('../../thunks/deleteNoteThunk.js');

describe('NoteCard', () => {
  let wrapper;
  const mockUser = { displayName: 'Jeo', email: 'jeo@email.com', uid: 'qwerty' };
  const mockProps = {
    ...mockNote,
    index: 0,
    notes: mockNotes,
    user: mockUser,
    putAllNotes: jest.fn(),
    putNote: jest.fn(),
    setStatus: jest.fn(),
    deleteNoteThunk: jest.fn()
  }
  const mockEvent = {
    dataTransfer: {
      setData: jest.fn(),
      getData: jest.fn(() => 1)
    },
    preventDefault: jest.fn()
  };
  const foundClass = '.NoteCard--background-lavender';

  beforeEach(() => {
    wrapper = shallow(<NoteCard {...mockProps} />);
  });

  it('should pass snapshot test', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should pass snapshot test when there are more than 10 items', () => {
    wrapper = shallow(<NoteCard {...mockNoteLong} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('getCompleteItems', () => {
    it('should return an array with length equal to complete items', () => {
      const foundClass = '.NoteCard--span--complete';      
      const wrapper = shallow(<NoteCard {...mockNote} />);
      const result = wrapper.instance().getCompleteItems();
      const wrapperComplete = shallow(result[0]);
      expect(wrapperComplete.find(foundClass)).toHaveLength(1);
    });
  });
  
  describe('getIncompleteItems', () => {
    it('should return an array with length equal to incomplete items', () => {
      const foundClass = '.NoteCard--span--incomplete';
      const wrapper = shallow(<NoteCard {...mockNote} />);
      const result = wrapper.instance().getIncompleteItems();
      const wrapperIncomplete = shallow(result[0]);
      expect(wrapperIncomplete.find(foundClass)).toHaveLength(1);
    });
  });

  describe('handleComplete', () => {
    it('should dispatch putNote with the updatedNote when the item was unchecked', () => {
      wrapper.find('.NoteCard--icon--unchecked').simulate('click');
      expect(mockProps.putNote).toHaveBeenCalledWith(mockNoteAfterComplete, mockUser);    
    });

    it('should dispatch putNote with the updateNote when the item was checked', () => {
      wrapper.find('.NoteCard--icon--checked').simulate('click');
      expect(mockProps.putNote).toHaveBeenCalledWith(mockNoteAfterCompleteOpposite, mockUser);    
    });
    
    it('should dispatch setStatus with 0', async () => {
      await wrapper.instance().handleComplete('lpo');
      expect(mockProps.setStatus).toHaveBeenCalledWith(0);
    });
  });
  
  describe('handleDelete', () => {
    it('should dispatch deleteNoteThunk with the id', () => {
      const expected = mockProps.id;
      wrapper.instance().handleDelete('rzz');
      expect(mockProps.deleteNoteThunk).toHaveBeenCalledWith(expected, mockUser);
    });
    
    it('should dispatch setStatus with 0', async () => {
      await wrapper.instance().handleDelete();
      expect(mockProps.setStatus).toHaveBeenCalledWith(0);
    });
  });

  describe('handleDrag', () => {
    it('should call dataTransfer.setData with the correct params', () => {
      wrapper.find(foundClass).simulate('dragstart', mockEvent);
      expect(mockEvent.dataTransfer.setData)
        .toHaveBeenCalledWith('draggedIndex', 0);
    });
  });
  
  describe('handleDragOver', () => {
    it('should call event.preventDefault()', () => {
      wrapper.find(foundClass).simulate('dragover', mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe('handleDrop', () => {
    it('should call putAllNotes with the updated array of notes', () => {
      wrapper.find(foundClass).simulate('drop', mockEvent);
      const expected = [mockNotes[1], mockNotes[0], ...mockNotes.slice(2)];
      expect(mockProps.putAllNotes).toHaveBeenCalledWith(expected, mockUser);
    });
  });

  describe('mapStateToProps', () => {
    it('should return a props object with notes', () => {
      const mockState = {
        notes: mockNotes,
        isLoading: false,
        status: 0,
        error: ''
      }
      const expected = { notes: mockNotes };
      const result = mapStateToProps(mockState);
      expect(result).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mappedProps = mapDispatchToProps(mockDispatch);

    it('should call dispatch with putAllNotes', () => {
      const actionToDispatch = putAllNotes(mockNotes);
      mappedProps.putAllNotes(mockNotes);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with putNote', () => {
      const actionToDispatch = putNote(mockNotes);
      mappedProps.putNote(mockNote);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with deleteNoteThunk', () => {
      const actionToDispatch = deleteNoteThunk('rzz');
      mappedProps.deleteNoteThunk('rzz');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with setStatus', () => {
      const actionToDispatch = setStatus(0);
      mappedProps.setStatus(0);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});