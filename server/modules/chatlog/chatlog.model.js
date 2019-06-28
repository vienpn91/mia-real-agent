import mongoose from 'mongoose';

const { Schema } = mongoose;

const chatLogSchema = new Schema(
  {
    ticketId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    messages: {
      type: [
        {
          messageOwner: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          timestamp: Date,
        },
      ],
      required: true,
    },
    type: String,
    status: String,
  },
  {
    versionKey: false,
    collection: 'chatlog',
  },
);

export default mongoose.model('ChatLog', chatLogSchema);
