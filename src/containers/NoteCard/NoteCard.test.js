import React from 'react';
import { shallow } from 'enzyme';
import { NoteCard, mapStateToProps, mapDispatchToProps } from './NoteCard';
import { putAllNotes } from '../../thunks/putAllNotes';
import { mockNotes, mockNote, mockNoteLong } from '../../mockNotes';

jest.mock('../../thunks/putAllNotes.js');

describe('NoteCard', () => {
  let wrapper;
  const mockProps = {
    ...mockNote,
    index: 0,
    notes: mockNotes,
    putAllNotes: jest.fn()
  }
  const mockEvent = {
    dataTransfer: {
      setData: jest.fn(),
      getData: jest.fn(() => 1)
    },
    preventDefault: jest.fn()
  };

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

  describe('handleDrag', () => {
    it('should call event.dataTransfer.setData with the correct params', () => {
      wrapper.find('.NoteCard--background-lavender').simulate('dragstart', mockEvent);
      expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith('draggedIndex', 0);
    });
  });
  
  describe('handleDragOver', () => {
    it('should call event.preventDefault()', () => {
      wrapper.find('.NoteCard--background-lavender').simulate('dragover', mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe('handleDrop', () => {
    it('should call putAllNotes with the updated array of notes', () => {
      wrapper.find('.NoteCard--background-lavender').simulate('drop', mockEvent);
      const expected = [mockNotes[1], mockNotes[0], ...mockNotes.slice(2)];
      expect(mockProps.putAllNotes).toHaveBeenCalledWith(expected);
    });
  });

  describe('mapStateToProps', () => {
    it('should take in initial state and return a props object with notes', () => {
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
    it('should call dispatch with putAllNotes when props.putAllNotes is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = putAllNotes(mockNotes);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.putAllNotes(mockNotes);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});