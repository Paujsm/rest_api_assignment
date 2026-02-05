const db = require("../config/firebase");

//C - Create income POST
exports.createIncome = async (req, res) => {
  try {
    const incomeData = req.body;
    const docRef = await db.collection("incomes").add(incomeData);
    res.status(201).json({
      message: "Income created successfully",
      id: docRef.id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create income", details: error.message });
  }
};

//R - Retrive all incomes GET
exports.getAllIncomes = async (req, res) => {
  try {
    const snapshot = await db.listCollections("incomes").get();
    const incomes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching incomes" });
  }
};

//U - Update income using ID PUT
exports.updateIncome = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const incomeRef = db.collection("incomes").doc(id);
    await incomeRef.update(updatedData);
    res.status(200).json({
      message: `Income updated successfully`,
      updatedFields: updatedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "failed to update income", detail: error.message });
  }
};

//D - Delete income using ID DELETE
exports.deleteIncome = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("incomes").doc(id).delete();
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete income" });
  }
};
