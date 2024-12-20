import Motion from "../models/motion.model.js";

export const getMotion = async (req, res) => {
  try {
    if (req.params.id) {
      const motion = await Motion.findById(req.params.id);
      if (!motion) {
        return res.status(404).json({ success: false, message: "Motion not found" });
      }
      res.status(200).json({ success: true, data: motion });
    } else {
      const motions = await Motion.find();
      res.status(200).json({ success: true, data: motions });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createMotion = async (req, res) => {
  try {
    const newMotion = new Motion(req.body);
    await newMotion.save();
    res.status(201).json({ success: true, data: newMotion });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
