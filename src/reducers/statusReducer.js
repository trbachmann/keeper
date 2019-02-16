export const statusReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_STATUS':
      return action.code;
    default:
      return state;
  }
}