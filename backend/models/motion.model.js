import mongoose from "mongoose";

const motionSchema = new mongoose.Schema(
  {

  },
  {
    timestamps: true,
  }
);

const Motion = mongoose.model("Motion", motionSchema);

export default Motion;
