import connectDB from '../db';
import Enrollment from '../models/enrollmentSchema';

export const findAllEnrollments = async () => {
  await connectDB();
  return await Enrollment.find({});
};

export const findEnrollmentsByUser = async (userId: string) => {
  await connectDB();
  return await Enrollment.find({ user: userId });
};

export const findEnrollmentsByCourse = async (courseId: string) => {
  await connectDB();
  return await Enrollment.find({ course: courseId });
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  await connectDB();
  return await Enrollment.create({ 
    _id: `${userId}-${courseId}`,
    user: userId, 
    course: courseId 
  });
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  await connectDB();
  return await Enrollment.findOneAndDelete({ user: userId, course: courseId });
};