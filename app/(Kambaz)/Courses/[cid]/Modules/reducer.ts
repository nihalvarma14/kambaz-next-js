import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

// Create reducer's initial state with default modules copied from database
const initialState = {
  modules: modules,
};

// Create slice
const modulesSlice = createSlice({
  name: "modules", // Name the slice
  initialState, // Set initial state
  reducers: {
    // Declare reducer functions
    
    // New module is in action.payload
    addModule: (state, { payload: module }) => {
      const newModule: any = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      // Update modules in state adding new module at end of array
      state.modules = [...state.modules, newModule] as any;
    },
    
    // Module's ID to delete is in action.payload
    deleteModule: (state, { payload: moduleId }) => {
      // Filter out module to delete
      state.modules = state.modules.filter(
        (m: any) => m._id !== moduleId
      );
    },
    
    // Module to update is in action.payload
    updateModule: (state, { payload: module }) => {
      // Replace module whose ID matches action.payload._id
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    
    // Select the module to edit
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});

// Export all reducer functions
export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;

// Export reducer
export default modulesSlice.reducer;