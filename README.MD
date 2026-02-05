# Finance REST API - WIT Assignment

## Description

This is a professional REST API built with Node.js, Express, and Firebase Firestore. It allows users to manage financial records, including Users, Expenses, and Income through standard CRUD operations.

## Project Structure

- /config: Firebase connection setup.
- /controllers: Business logic for each resource.
- /routes: API route definitions.
- index.js: Entry point of the application.

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v18 or higher)
- An active Firebase Project with Firestore enabled.

---

## Installation Steps

To run this API locally on your machine, please follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Paujsm/RestAPI_Assignment.git

   ```

2. **Navigate to the project folder:**

   ```bash
   cd RestAPI_Assignment

   ```

3. **Install the necessary tools:**

Run the following command to install all dependencies listed in the package.json:

```bash
npm install

```

4. **Configure Environment Variables**

- Create a file named `.env` in the root folder.
- Add your own **Firebase Service Account** credentials using the format below:

PORT=3000
FIREBASE_PROJECT_ID= your_firebase_project_id
FIREBASE_CLIENT_EMAIL= your_service_account_email
FIREBASE_PRIVATE_KEY= "your_private_key_string"

5. **Start the server**

Launch the application by running:

# Option 1: Using npm script

    ```bash
    npm start
    ```

# Option 2: Running directly with Node

    ```bash
    node index.js
    ```

6. **Test the API:**

You can now send requests to `http://localhost:3000/users` using Postman.

---

## API Endpoints

**/users**
GET /users Retrieve all users from Firestore
POST /users Create a new user record
PUT /users/:id Update an existing user by ID
DELETE /users/:id Remove a user from the database

**/expenses**
GET /expenses Retrieve all expenses from Firestore
POST /expenses Create a new expense record
PUT /expenses/:id Update an existing expense by ID
DELETE /expenses/:id Remove a expense from the database

**/incomes**
GET /incomes Retrieve all incomes from Firestore
POST /incomes Create a new income record
PUT /incomes/:id Update an existing income by ID
DELETE /incomes/:id Remove a income from the database

---

## Key Dependencies

The following core libraries were used to build this system:

- **[Express.js](https://expressjs.com/):** A fast and minimalist web framework for Node.js, used to manage our API routes and HTTP requests.
- **[Firebase Admin SDK](https://firebase.google.com/docs/admin/setup):** The official library used to securely communicate with Google Firebase and manage Firestore database operations.
- **[Dotenv](https://www.npmjs.com/package/dotenv):** A zero-dependency module that loads environment variables from a `.env` file into `process.env`, ensuring secure credential management.
