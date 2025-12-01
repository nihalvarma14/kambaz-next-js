import connectDB from '../db';
import User from '../models/userSchema';

export const findAllUsers = async () => {
  await connectDB();
  return await User.find({});
};

export const findUserById = async (userId: string) => {
  await connectDB();
  return await User.findById(userId);
};

export const findUserByUsername = async (username: string) => {
  await connectDB();
  return await User.findOne({ username });
};

export const findUsersByRole = async (role: string) => {
  await connectDB();
  return await User.find({ role });
};

export const createUser = async (user: any) => {
  await connectDB();
  return await User.create(user);
};

export const updateUser = async (userId: string, user: any) => {
  await connectDB();
  return await User.findByIdAndUpdate(userId, user, { new: true });
};

export const deleteUser = async (userId: string) => {
  await connectDB();
  return await User.findByIdAndDelete(userId);
};