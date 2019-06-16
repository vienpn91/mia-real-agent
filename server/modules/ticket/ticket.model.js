import mongoose from 'mongoose';
import { TICKET_STATUS } from '../../utils/enums';

const { Schema } = mongoose;

const ticketSchema = new Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: [TICKET_STATUS.CLOSED, TICKET_STATUS.NEW, TICKET_STATUS.PENDING, TICKET_STATUS.PROCESSING, TICKET_STATUS.RESOLVED],
    },
    category: [String],
    owner: mongoose.Schema.Types.ObjectId,
    resolvedBy: mongoose.Schema.Types.ObjectId,
    resolvedAt: mongoose.Schema.Types.ObjectId,
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'ticket',
  }
);

export default mongoose.model('Ticket', ticketSchema);
