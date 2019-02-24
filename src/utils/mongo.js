const mongoConfiguration = () => {

    const mongoose = require('mongoose');

    // Connect to mongodb
    const DB_URL = 'mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE;
    mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true });
    mongoose.Promise = global.Promise;

    // When successfully connected
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + DB_URL);
    });

    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};

module.exports = mongoConfiguration();