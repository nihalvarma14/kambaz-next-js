import connectDB from '../db';
import Assignment from '../models/assignmentSchema';

export const findAllAssignments = async () => {
  await connectDB();
  return await Assignment.find({});
};

export const findAssignmentById = async (assignmentId: string) => {
  await connectDB();
  return await Assignment.findById(assignmentId);
};

export const findAssignmentsByCourse = async (courseId: string) => {
  await connectDB();
  return await Assignment.find({ course: courseId });
};

export const createAssignment = async (assignment: any) => {
  await connectDB();
  return await Assignment.create(assignment);
};

export const updateAssignment = async (assignmentId: string, assignment: any) => {
  await connectDB();
  return await Assignment.findByIdAndUpdate(assignmentId, assignment, { new: true });
};

export const deleteAssignment = async (assignmentId: string) => {
  await connectDB();
  return await Assignment.findByIdAndDelete(assignmentId);
};