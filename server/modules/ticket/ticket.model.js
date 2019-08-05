import mongoose from 'mongoose';
import { TICKET_STATUS } from '../../../common/enums';

const { Schema } = mongoose;

const ticketSchema = new Schema(
  {
    ticketId: String,
    conversationId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: [
        TICKET_STATUS.CLOSED,
        TICKET_STATUS.OPEN,
        TICKET_STATUS.IDLE,
        TICKET_STATUS.PROCESSING,
        TICKET_STATUS.RESOLVED,
        TICKET_STATUS.OFFLINE,
        TICKET_STATUS.PENDING,
      ],
      default: TICKET_STATUS.OPEN,
    },
    category: [String],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    assignee: { type: Schema.Types.ObjectId, ref: 'User' },
    deletedAt: {
      type: Date,
      default: null,
    },
    archivedAt: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'ticket',
  }
);

export default mongoose.model('Ticket', ticketSchema);
