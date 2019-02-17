import { notesReducer } from './notesReducer';
import * as actions from '../actions';
import * as data from '../mockNotes';

describe('notesReducer', () => {
  it('should return the default state', () => {
    const expected = [];
    const result = notesReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return state with an array of notes', () => {
    const expected = data.mockNotes;
    const result = notesReducer(undefined, actions.setNotes(data.mockNotes));
    expect(result).toEqual(expected);
  });

  it('should return state with a new note', () => {
    const initialState = [];
    const expected = [ data.mockNote ];
    const result = notesReducer(initialState, actions.addNote(data.mockNote));
    expect(result).toEqual(expected);
  });

  it('should return state with the correct note updated', () => {
    const initialState = data.mockNotes;
    const expected = data.mockNotesAfterUpdating;
    const result = notesReducer(initialState, actions.updateNote(data.mockUpdatedNote));
    expect(result).toEqual(expected);
  });

  it('should return state with the correct note deleted', () => {
    const initialState = data.mockNotes;
    const mockId = 'bah';
    const expected = data.mockNotesAfterDelete;
    const result = notesReducer(initialState, actions.deleteNote(mockId));
    expect(result).toEqual(expected);
  });
});