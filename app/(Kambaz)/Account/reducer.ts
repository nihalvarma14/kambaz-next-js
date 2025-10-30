import { createSlice } from "@reduxjs/toolkit";

// Create reducer's initial state with no user signed in
const initialState = {
  currentUser: null,
};

// Create slice
const accountSlice = createSlice({
  name: "account", // Name the slice
  initialState, // Set initial state
  reducers: {
    // Reducer function to set the current user
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

// Export the reducer function
export const { setCurrentUser } = accountSlice.actions;

// Export the reducer
export default accountSlice.reducer;