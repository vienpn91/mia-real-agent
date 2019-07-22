import mongoose from 'mongoose';
import { REPLY_TYPE } from '../../../common/enums';

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
    type: {
      type: String,
      default: REPLY_TYPE.USER_NORMAL,
    },
    status: String,
  },
  {
    versionKey: false,
    collection: 'reply',
  },
);

export default mongoose.model('Reply', ReplySchema);
