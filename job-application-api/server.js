const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); // Import cors
console.log("Starting server setup...");  // Log at the beginning of the file
const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); 

// Add a test route to verify the server is working
app.get('/api/test', (req, res) => {
  res.send("Server is running!");
});

// Start the server and listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// MySQL connection config
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Root@1234#', // Your MySQL root password
  database: 'job_application_db'
};

// GET API endpoint to retrieve job application data by ID
app.get('/api/job-application/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Connect to MySQL database
    const connection = await mysql.createConnection(dbConfig);
    
    // Query the database for the job application with the given ID
    const [rows] = await connection.execute('SELECT * FROM job_applications WHERE id = ?', [id]);
    await connection.end();

    if (rows.length > 0) {
      // If a record is found, send it as the response
      res.status(200).json(rows[0]);
    } else {
      // If no record is found, send a 404 response
      res.status(404).json({ message: 'Job application not found' });
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error fetching job application:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST API endpoint to create a new job application
app.post('/api/job-application', async (req, res) => {
  console.log("POST /api/job-application called");
  console.log("Request Body:", req.body); // Log the request body

  const {
    name = null,
    email = null,
    phone = null,
    coverLetter = null,
    experience = null,
    resume = null,
    jobTitle = null
  } = req.body;

  try {
    // Connect to MySQL database
    const connection = await mysql.createConnection(dbConfig);

    // Insert a new job application into the database
    const [result] = await connection.execute(
      'INSERT INTO job_applications (name, email, phone, coverLetter, experience, resume, jobTitle) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, coverLetter, experience, resume, jobTitle]
    );
    await connection.end();

    console.log("Record inserted, ID:", result.insertId); // Log the inserted record ID
    res.status(201).json({ message: 'Job application created successfully', id: result.insertId });
  } catch (error) {
    console.error("Error inserting job application:", error); // Log any errors that occur
    res.status(500).json({ error: error.message });
  }
});
