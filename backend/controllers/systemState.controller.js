import SystemState from "../models/systemState.model.js";

// Get the current system state
export const getSystemState = async (req, res) => {
  try {
    // Retrieve the first document (we assume there's only one document for the system state)
    const systemState = await SystemState.findOne();
    if (!systemState) {
      return res
        .status(404)
        .json({ success: false, message: "System state not found" });
    }
    res
      .status(200)
      .json({ success: true, systemState: systemState.systemState });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Toggle the system state
export const toggleSystemState = async (req, res) => {
  try {
    // Retrieve the first system state document (no need for an _id or query parameter)
    let systemState = await SystemState.findOne();
    
    // If no document exists, create one with the default state
    if (!systemState) {
      systemState = new SystemState({ systemState: true });
      await systemState.save();
      return res.status(201).json({ success: true, systemState: systemState.systemState });
    }

    // Toggle the system state
    systemState.systemState = !systemState.systemState;
    
    // Save the updated system state
    await systemState.save();
    
    res.status(200).json({ success: true, systemState: systemState.systemState });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
