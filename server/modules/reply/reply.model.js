import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReplySchema = new Schema(
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
    collection: 'reply',
  },
);

export default mongoose.model('Reply', ReplySchema);
