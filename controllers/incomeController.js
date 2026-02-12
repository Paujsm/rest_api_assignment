// Import the database connection from config folder
const db = require("../config/firebase");

// CREATE: Logic to add a new user to the database
exports.createIncome = async (req, res) => {
  try {
    // Generate a new unique reference (ID) in the "incomes" node
    const newIncomeRef = db.ref("incomes").push();
    // Save the data received from the request into that reference
    await newIncomeRef.set(req.body);
    // Respond with status 201 (Created) and the new ID
    res
      .status(201)
      .json({ id: newIncomeRef.key, message: "Income created successfully" });
  } catch (error) {
    // Catch-all for server or database errors
    res.status(500).json({ error: error.message });
  }
};

// READ: Logic to fetch all incomes
exports.getAllIncomes = async (req, res) => {
  // Get a snapshot from the "incomes" node once
  try {
    const snapshot = await db.ref("incomes").once("value");
    const data = snapshot.val();
    // Transform the Firebase object into an array
    const incomes = data
      ? Object.keys(data).map((key) => ({
          id: key, // Extract the Firebase ID
          ...data[key], // Spread the rest of the income's data
        }))
      : [];
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE: Logic to modify an existing income
exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL
    const updatedData = req.body; // Get the new data
    const incomeRef = db.ref("incomes").child(id); // Point to that specific income

    // Verify if the income exists before updating
    const snapshot = await db.ref("incomes").child(id).once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "Not found. Invalid ID.",
      });
    }

    // Apply only the changes sent in the body
    await incomeRef.update(updatedData);
    res.status(200).json({
      success: true,
      message: `Income updated successfully`,
      updatedFields: updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Logic to remove an income
exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL
    const snapshot = await db.ref("incomes").child(id).once("value");

    // Verify existence before attempting to remove
    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "Not found. Invalid ID.",
      });
    }

    // Remove the node from the database
    await db.ref("incomes").child(id).remove();
    res
      .status(200)
      .json({ success: true, message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
