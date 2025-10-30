import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

// Define the Module type
interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: any[]; // You can define a Lesson type if needed
  editing?: boolean;
}

// Define the state type
interface ModulesState {
  modules: Module[];
}

// Define payload types
interface AddModulePayload {
  name: string;
  course: string;
}

// Create reducer's initial state with default modules copied from database
const initialState: ModulesState = {
  modules: modules,
};

// Create slice
const modulesSlice = createSlice({
  name: "modules", // Name the slice
  initialState, // Set initial state
  reducers: {
    // Declare reducer functions
    
    // New module is in action.payload
    addModule: (state, { payload: module }: PayloadAction<AddModulePayload>) => {
      const newModule: Module = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      // Update modules in state adding new module at end of array
      state.modules = [...state.modules, newModule];
    },
    
    // Module's ID to delete is in action.payload
    deleteModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      // Filter out module to delete
      state.modules = state.modules.filter(
        (m) => m._id !== moduleId
      );
    },
    
    // Module to update is in action.payload
    updateModule: (state, { payload: module }: PayloadAction<Module>) => {
      // Replace module whose ID matches action.payload._id
      state.modules = state.modules.map((m) =>
        m._id === module._id ? module : m
      );
    },
    
    // Select the module to edit
    editModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});

// Export all reducer functions
export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;

// Export reducer
export default modulesSlice.reducer;