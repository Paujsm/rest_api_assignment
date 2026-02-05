const db = require("../config/firebase");

//C - create user POST
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const docRef = await db.collection("users").add(userData);
    res.status(201).json({
      message: "User created successfully",
      id: docRef.id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
};

//R - Retrive all users GET
exports.getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

//U - Update a parameter in the object PUT
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const userRef = db.collection("users").doc(id);
    await userRef.update(updatedData);
    res.status(200).json({
      message: `User ${id} updated successfully`,
      updatedFields: updatedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Dailed to update user", details: error.message });
  }
};

//D - Delete user using id DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("users").doc(id).delete();
    res.status(200).json({ message: `User ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
