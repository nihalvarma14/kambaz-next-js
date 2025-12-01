import mongoose, { Schema, model, models } from 'mongoose';

const assignmentSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  course: { type: String, required: true },
  description: String,
  points: Number,
  dueDate: String,
  availableDate: String,
  availableUntilDate: String,
}, { collection: 'assignments' });

const Assignment = models.Assignment || model('Assignment', assignmentSchema);

export default Assignment;