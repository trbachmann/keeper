export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return action.notes;
    case 'ADD_NOTE':
      return [...state, action.note];
    case 'UPDATE_NOTE':
      return state.map(note => {
        const { id } = action.note;
        return note.id === id ? action.note : note;
      });
    case 'DELETE_NOTE':
      return state.filter(note => note.id !== action.id);
    default:
      return state;
  }
}