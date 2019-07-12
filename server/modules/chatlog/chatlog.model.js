import mongoose from 'mongoose';

const { Schema } = mongoose;

const chatLogSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    messages: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    type: String,
    status: String,
  },
  {
    versionKey: false,
    collection: 'chat_log',
  },
);

export default mongoose.model('ChatLog', chatLogSchema);
