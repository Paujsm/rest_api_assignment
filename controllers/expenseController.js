// Import the database connection from config folder
const db = require("../config/firebase");

// CREATE: Logic to add a new user to the database
exports.createExpense = async (req, res) => {
  try {
    // Generate a new unique reference (ID) in the "expenses" node
    const newExpenseRef = db.ref("expenses").push();
    // Save the data received from the request into that reference
    await newExpenseRef.set(req.body);
    // Respond with status 201 (Created) and the new ID
    res
      .status(201)
      .json({ id: newExpenseRef.key, message: "Expense created successfully" });
  } catch (error) {
    // Catch-all for server or database errors
    res.status(500).json({ error: error.message });
  }
};

// READ: Logic to fetch all expenses
exports.getAllExpenses = async (req, res) => {
  // Get a snapshot from the "expenses" node once
  try {
    const snapshot = await db.ref("expenses").once("value");
    const data = snapshot.val();
    // Transform the Firebase object into an array
    const expenses = data
      ? Object.keys(data).map((key) => ({
          id: key, // Extract the Firebase ID
          ...data[key], // Spread the rest of the expense's data
        }))
      : [];
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE: Logic to modify an existing expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL
    const updatedData = req.body; // Get the new data
    const expenseRef = db.ref("expenses").child(id); // Point to that specific expense

    // Verify if the expense exists before updating
    const snapshot = await db.ref("expenses").child(id).once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "Not found. Invalid ID.",
      });
    }

    // Apply only the changes sent in the body
    await expenseRef.update(updatedData);
    res.status(200).json({
      success: true,
      message: `Expense updated successfully`,
      updatedFields: updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Logic to remove a expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL
    const snapshot = await db.ref("expenses").child(id).once("value");

    // Verify existence before attempting to remove
    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "Not found. Invalid ID.",
      });
    }

    // Remove the node from the database
    await db.ref("expenses").child(id).remove();
    res
      .status(200)
      .json({ success: true, message: `Expense deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
