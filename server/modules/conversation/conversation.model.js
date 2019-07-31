import mongoose from 'mongoose';
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    ticketId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    members: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
    ratingScore: {
      type: Number,
      default: 0,
    },
    ratingComment: String,
    status: String,
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    collection: 'conversation',
  },
);

export default mongoose.model('Conversation', conversationSchema);
