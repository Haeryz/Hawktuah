import mongoose from 'mongoose';

const systemStateSchema = new mongoose.Schema(
  {
    systemState: { type: Boolean, required: true, default: true }, // System state (ON/OFF)
  },
  { timestamps: true }
);

const SystemState = mongoose.model('SystemState', systemStateSchema);

export default SystemState;
