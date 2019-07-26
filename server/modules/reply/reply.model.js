import mongoose from 'mongoose';
import { REPLY_TYPE, REPLY_STATUS } from '../../../common/enums';

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
    sentAt: {
      type: Date,
      default: () => new Date(),
    },
    type: {
      type: String,
      default: REPLY_TYPE.USER_NORMAL,
    },
    status: {
      type: String,
      default: REPLY_STATUS.PENDING,
    },
  },
  {
    versionKey: false,
    collection: 'reply',
  },
);

export default mongoose.model('Reply', ReplySchema);
