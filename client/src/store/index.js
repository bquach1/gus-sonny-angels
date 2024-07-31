import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers'; // Import your root reducer

export default configureStore({
  reducer: rootReducer,
})