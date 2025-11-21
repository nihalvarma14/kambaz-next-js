import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface AddState {
  sum: number;
}

// Define the payload type for the add action
interface AddPayload {
  a: number;
  b: number;
}

const initialState: AddState = {
  sum: 0,
};

const addSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<AddPayload>) => {
      state.sum = action.payload.a + action.payload.b;
    },
  },
});

export const { add } = addSlice.actions;
export default addSlice.reducer;