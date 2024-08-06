import { configureStore } from '@reduxjs/toolkit';
import TodoSliceReducer from './slice';

export default configureStore({
  reducer: {
    TodoReducer:TodoSliceReducer
  }
})