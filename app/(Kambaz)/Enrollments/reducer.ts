import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

// Define the Enrollment type
interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

// Define the state type
interface EnrollmentsState {
  enrollments: Enrollment[];
}

// Define payload type for enrollment actions
interface EnrollmentPayload {
  userId: string;
  courseId: string;
}

const initialState: EnrollmentsState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollUser: (state, { payload: { userId, courseId } }: PayloadAction<EnrollmentPayload>) => {
      const newEnrollment: Enrollment = {
        _id: new Date().getTime().toString(),
        user: userId,
        course: courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },
    
    unenrollUser: (state, { payload: { userId, courseId } }: PayloadAction<EnrollmentPayload>) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
  },
});

export const { enrollUser, unenrollUser } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;