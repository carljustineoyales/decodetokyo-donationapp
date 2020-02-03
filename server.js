const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;


app.listen(port, () =>{console.log(`Server Started on port ${port}`)}) 