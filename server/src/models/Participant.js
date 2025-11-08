import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, match: /.+@.+\..+/ },
  mobile: { type: String, required: true, minlength: 10, maxlength: 10 },
  dept: { type: String, required: true },
  rollNo: { type: String, required: true },
  event: { type: String, required: true },
  verified: { type: Boolean, default: false },
  qrCode: { type: String, default: null },
  attended: { type: Boolean, default: false },   // <-- add this
  createdAt: { type: Date, default: Date.now }
});

participantSchema.index({ email: 1, event: 1 }, { unique: true });

export default mongoose.model('Participant', participantSchema);
