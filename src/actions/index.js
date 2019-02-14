export const setNotes = (notes) => ({
  type: 'SET_NOTES',
  notes
});

export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note
});

export const updateNote = (note) => ({
  type: 'UPDATE_NOTE',
  note
});

export const deleteNote = (id) => ({
  type: 'DELETE_NOTE',
  id
});

export const toggleLoading = (bool) => ({
  type: 'TOGGLE_LOADING',
  bool
});

export const setError = (message) => ({
  type: 'SET_ERROR',
  message
});