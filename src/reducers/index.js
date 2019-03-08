import { combineReducers } from 'redux';
import { notesReducer } from './notesReducer';
import { isLoadingReducer } from './isLoadingReducer';
import { errorReducer } from './errorReducer';
import { statusReducer } from './statusReducer';
import { queryReducer } from './queryReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  notes: notesReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
  status: statusReducer,
  query: queryReducer,
  user: userReducer
});