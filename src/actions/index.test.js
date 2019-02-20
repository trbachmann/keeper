import * as actions from './index';
import * as data from '../mockNotes';

describe('actions', () => {
  describe('setNotes', () => {
    it('should return an object with a type of SET_NOTES and notes', () => {
      const expected = {
        type: 'SET_NOTES',
        notes: data.mockNotes
      };
      const result = actions.setNotes(data.mockNotes);
      expect(result).toEqual(expected);
    });
  });

  describe('addNote', () => {
    it('should return an object with a type of ADD_NOTE and a note', () => {
      const expected = {
        type: 'ADD_NOTE',
        note: data.mockNote
      };
      const result = actions.addNote(data.mockNote);
      expect(result).toEqual(expected);
    });
  });

  describe('updateNote', () => {
    it('should return an object with a type of UPDATE_NOTE and a note', () => {
      const expected = {
        type: 'UPDATE_NOTE',
        note: data.mockNote
      };
      const result = actions.updateNote(data.mockNote);
      expect(result).toEqual(expected);
    });
  });

  describe('deleteNote', () => {
    it('should return an object with a type of DELETE_NOTE and an id', () => {
      const mockId = 'rop';
      const expected = {
        type: 'DELETE_NOTE',
        id: mockId
      };
      const result = actions.deleteNote(mockId);
      expect(result).toEqual(expected);
    });
  });

  describe('toggleLoading', () => {
    it('should return an object with a type of TOGGLE_LOADING and a boolean', () => {
      const mockBool = true;
      const expected = {
        type: 'TOGGLE_LOADING',
        bool: mockBool
      };
      const result = actions.toggleLoading(mockBool);
      expect(result).toEqual(expected);
    });
  });

  describe('setError', () => {
    it('should return an object with a type SET_ERROR of and a message', () => {
      const mockMessage = 'Note not found';
      const expected = {
        type: 'SET_ERROR',
        message: mockMessage
      };
      const result = actions.setError(mockMessage);
      expect(result).toEqual(expected);
    });
  }); 

  describe('setStatus', () => {
    it('should return an object with a type SET_STATUS and a code', () => {
      const expected = {
        type: 'SET_STATUS',
        code: 200
      };
      const result = actions.setStatus(200);
      expect(result).toEqual(expected);
    });
  });

  describe('setQuery', () => {
    it('should return an object with a type SET_QUERY and a query', () => {
      const expected = {
        type: 'SET_QUERY',
        query: 'heyo'
      };
      const result = actions.setQuery('heyo');
      expect(result).toEqual(expected);
    });
  });
});