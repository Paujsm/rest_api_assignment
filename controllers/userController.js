// Import the database connection from config folder
const db = require("../config/firebase");

// CREATE: Logic to add a new user to the database
exports.createUser = async (req, res) => {
  try {
    // Generate a new unique reference (ID) in the "users" node
    const newUserRef = db.ref("users").push();
    // Save the data received from the request into that reference
    await newUserRef.set(req.body);
    // Respond with status 201 (Created) and the new ID
    res
      .status(201)
      .json({ id: newUserRef.key, message: "User created successfully" });
  } catch (error) {
    // Catch-all for server or database errors
    res.status(500).json({ error: error.message });
  }
};

// READ: Logic to fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    // Get a snapshot from the "users" node once
    const snapshot = await db.ref("users").once("value");
    const data = snapshot.val();
    // Transform the Firebase object into an array
    const users = data
      ? Object.keys(data).map((key) => ({
          id: key, // Extract the Firebase ID
          ...data[key], // Spread the rest of the user's data
        }))
      : [];
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE: Logic to modify an existing user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL
    const updatedData = req.body; // Get the new data
    const userRef = db.ref("users").child(id); // Point to that specific user

    // Verify if the user exists before updating
    const snapshot = await db.ref("users").child(id).once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "User not found. Invalid ID.",
      });
    }

    // Apply only the changes sent in the body
    await userRef.update(updatedData);
    res.status(200).json({
      success: true,
      message: `User updated successfully`,
      updatedFields: updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE: Logic to remove a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL
    const snapshot = await db.ref("users").child(id).once("value");

    // Verify existence before attempting to remove
    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "User not found. Invalid ID.",
      });
    }

    // Remove the node from the database
    await db.ref("users").child(id).remove();
    res
      .status(200)
      .json({ success: true, message: `User deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
