require('dotenv-extended').load();
const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const { jobHistorySlice } = require('./utils/cron');

// Init new application
const app = express();

// Setup mongodb connection
require('./utils/mongo');

// Setup basic auth check
const { checkUserPassword } = require('./utils/auth');
app.use(basicAuth({
    authorizer: checkUserPassword,
    unauthorizedResponse: 'It looks like you have provided wrong auth credentials'
}));

// Initialize body parser
app.use(bodyParser.json());

// Initialize routes
app.use('/api/v1/', require('./routes/version_v1'));

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

// Start the application
const server = app.listen(process.env.HTTP_PORT, () => {
    console.log('Server is running on port ' + process.env.HTTP_PORT);
});

// shutdown
const stopHandler = () => {
    server && server.close(() => {
        console.log('Server is stopped on port ' + process.env.HTTP_PORT);
    });
};

// Run history job
jobHistorySlice.start();

process.on('SIGTERM', stopHandler);
process.on('SIGINT', stopHandler);
