import mongoose from "mongoose";

const motionSchema = new mongoose.Schema(
  {
    pir: { type: Number, required: true },
    sound: { type: Number, required: true },
    buzzer: { type: String, required: true },
    led: { type: String, required: true },
    keterangan: { type: String, required: true },
  },
  { timestamps: true }
);

const Motion = mongoose.model("Motion", motionSchema);

export default Motion;
