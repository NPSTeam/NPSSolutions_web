import { combineReducers } from '@reduxjs/toolkit';
import manageItemsApp from './manageItemsAppSlice';

const reducer = combineReducers({
  manageItemsApp,
});

export default reducer;
