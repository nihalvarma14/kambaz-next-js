import mongoose, { Schema, model, models } from 'mongoose';

const enrollmentSchema = new Schema({
  _id: { type: String, required: true },
  user: { type: String, required: true },
  course: { type: String, required: true },
}, { collection: 'enrollments' });

const Enrollment = models.Enrollment || model('Enrollment', enrollmentSchema);

export default Enrollment;