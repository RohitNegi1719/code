const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint to handle code execution
app.post('/execute', (req, res) => {
    const { script, language } = req.body;

    // Update the program object with the provided language
    const program = {
        script,
        language, // Dynamically set the language based on user selection
        versionIndex: "0",
        clientId: "YourClientID", // Replace with your JDoodle client ID
        clientSecret: "YourClientSecret" // Replace with your JDoodle client secret
    };

    // Make a POST request to the JDoodle execute endpoint
    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: program
    }, function(error, response, body) {
        if (error) {
            console.error('Error making API request:', error);
            res.status(500).send('Error executing code');
        } else {
            res.json(body);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
