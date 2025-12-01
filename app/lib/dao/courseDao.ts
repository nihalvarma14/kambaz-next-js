import connectDB from '../db';
import Course from '../models/courseSchema';

export const findAllCourses = async () => {
  await connectDB();
  return await Course.find({});
};

export const findCourseById = async (courseId: string) => {
  await connectDB();
  return await Course.findById(courseId);
};

export const createCourse = async (course: any) => {
  await connectDB();
  return await Course.create(course);
};

export const updateCourse = async (courseId: string, course: any) => {
  await connectDB();
  return await Course.findByIdAndUpdate(courseId, course, { new: true });
};

export const deleteCourse = async (courseId: string) => {
  await connectDB();
  return await Course.findByIdAndDelete(courseId);
};