import { createSlice } from '@reduxjs/toolkit';
import { DIALOG_DEFAULT_DATA } from '../../constants/redux';

export const counterSlice = createSlice({
  name: 'dialog',
  initialState: {
    data: null,
    visible: false,
  },
  reducers: {
    open: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.visible = true;
      state.data = {
        ...DIALOG_DEFAULT_DATA,
        ...action.payload,
      };
    },
    close: state => {
      state.visible = false;
      state.data = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = counterSlice.actions;
export default counterSlice.reducer;
