const db = require("../config/firebase");

//C - Create an expense
exports.createExpense = async (req, res) => {
  try {
    const newExpense = req.body;
    const docRef = await db.collection("expenses").add(newExpense);
    res.status(201).json({ id: docRef.id, message: "Expense added" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense" });
  }
};

//R - Read all expenses GET
exports.getAllExpenses = async (req, res) => {
  try {
    const snapshot = await db.collection("expenses").get();
    const expenses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching expenses" });
  }
};

//U - Update using ID PUT
exports.updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const expenseRef = db.collection("expenses").doc(id);
    await expenseRef.update(updatedData);
    res.status(200).json({
      message: `Expense ${id} updated succesfully`,
      updatedFields: updatedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update expense", detail: error.message });
  }
};

//D Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("expenses").doc(id).delete();
    res.status(200).json({ message: `Expense deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};
