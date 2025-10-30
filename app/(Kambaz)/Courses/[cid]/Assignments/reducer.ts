import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";

// Define the Assignment type based on your database structure
interface Assignment {
  _id: string;
  title?: string;
  course?: string;
  availableDate?: string;
  dueDate?: string;
  points?: number;
  editing?: boolean;
  // Add other properties that your assignments have
}

// Define the state type
interface AssignmentsState {
  assignments: Assignment[];
}

// Create reducer's initial state with default assignments from database
const initialState: AssignmentsState = {
  assignments: assignments,
};

// Create slice
const assignmentsSlice = createSlice({
  name: "assignments", // Name the slice
  initialState, // Set initial state
  reducers: {
    // Add a new assignment
    addAssignment: (state, { payload: assignment }: PayloadAction<Omit<Assignment, '_id'>>) => {
      const newAssignment: Assignment = {
        ...assignment,
        _id: new Date().getTime().toString(), // Generate unique ID
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    
    // Delete an assignment by ID
    deleteAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId
      );
    },
    
    // Update an assignment
    updateAssignment: (state, { payload: assignment }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? assignment : a
      );
    },
    
    // Set the editing flag for an assignment
    editAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      );
    },
  },
});

// Export all reducer functions
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;

// Export reducer
export default assignmentsSlice.reducer;