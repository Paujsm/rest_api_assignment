// Load environment variables from the .env file into process.env
require("dotenv").config();

// Import the Express framework
const express = require("express");

// Initialize the Express application
const app = express();

// Import the route files for each specific resource
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const incomeRoutes = require("./routes/incomeRoutes");

// Middleware to allow the app to understand and parse JSON data in request bodies
app.use(express.json());

// Define the main paths for each resource
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/incomes", incomeRoutes);

// Default route for the root URL
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif;  height: 100vh; background-color: #f4f7f6;  }
          section { display: flex; justify-content: center; align-items: center; margin: 0; gap:20px }
          .container { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; }
          h1 { color: #db7f34; text-align: center; padding:30px; }        
          .endpoint-list { list-style: none; padding: 0; font-size:13; }
          .endpoint-item { margin: 15px 0; }
          .btn { font-weight: 700; text-decoration: none; background: #db7f34; color: white; padding: 10px 15px; border-radius: 5px; transition: 0.3s; display: inline-block; width: 150px; }
          .btn:hover { background: #bb6a28; transform: scale(1.03); }
        </style>
      </head>
      <body>
        <h1>Finance REST API </h1>     
        <section>
          <div class="container">          
            <h3>Users</h3>
            <ul class="endpoint-list">
              <li class="endpoint-item"><a href="/users" class="btn">GET /users</a></li>
              <li class="endpoint-item">POST /users - Create user</li>
              <li class="endpoint-item">PUT /users/:id - Update user details</li>
              <li class="endpoint-item">DELETE /users/:id - Delete a user</li>
            </ul>
          </div>
          <div class="container">
            <h3>Incomes</h3>
            <ul class="endpoint-list">
              <li class="endpoint-item"><a href="/incomes" class="btn">GET /incomes</a></li>
              <li class="endpoint-item">POST /incomes - Create income</li>
              <li class="endpoint-item">PUT /incomes/:id - Update income details</li>
              <li class="endpoint-item">DELETE /incomes/:id - Delete an income</li>
            </ul>
          </div>
          <div class="container">
            <h3>Expenses</h3>
            <ul class="endpoint-list">
              <li class="endpoint-item"><a href="/expenses" class="btn">GET /expenses</a></li>
              <li class="endpoint-item">POST /expenses - Create expense</li>
              <li class="endpoint-item">PUT /expenses/:id - Update expense details</li>
              <li class="endpoint-item">DELETE /expenses/:id - Delete a expense</li>
            </ul>
          </div>
        </section>
      </body>    
    </html>
  `);
});

// Set the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Export the app instance for deployment or testing
module.exports = app;
