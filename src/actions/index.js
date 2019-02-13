export const setNotes = (notes) => ({
  type: 'SET_NOTES',
  notes
});

export const toggleLoading = (bool) => ({
  type: 'TOGGLE_LOADING',
  bool
});

export const setError = (message) => ({
  type: 'SET_ERROR',
  message
});