const express = require('express');
const logger = require('./logger'); // Import the logger

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Handle POST request
app.post('/btc', (req, res) => {
  const data = req.body; // Data sent in the POST request
  logger.info('Received data: ' + JSON.stringify(data)); // Log with Winston

  // Respond with a message including part of the received data
  res.json({ message: `Data received successfully!`, receivedData: data });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
