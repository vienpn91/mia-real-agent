import mongoose from 'mongoose';
import { TICKET_STATUS } from '../../../common/enums';

const { Schema } = mongoose;

const ticketSchema = new Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: [TICKET_STATUS.CLOSED, TICKET_STATUS.NEW, TICKET_STATUS.PENDING, TICKET_STATUS.PROCESSING, TICKET_STATUS.RESOLVED],
      default: TICKET_STATUS.NEW,
    },
    category: [String],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    assignee: { type: Schema.Types.ObjectId, ref: 'User' },
    resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'ticket',
  }
);

export default mongoose.model('Ticket', ticketSchema);
