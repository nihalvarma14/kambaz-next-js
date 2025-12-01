import mongoose, { Schema, model, models } from 'mongoose';

const moduleSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  course: { type: String, required: true },
  lessons: [
    {
      _id: String,
      name: String,
      description: String,
      module: String,
    }
  ],
}, { collection: 'modules' });

const Module = models.Module || model('Module', moduleSchema);

export default Module;