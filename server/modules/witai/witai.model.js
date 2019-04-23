import mongoose from 'mongoose';

const { Schema } = mongoose;

const witAiSchema = new Schema(
  {
    intent_name: String,
    entity_name: String,
    entity_value: String,
    response: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    collection: 'witai',
  },
);

export default mongoose.model('witai', witAiSchema);
