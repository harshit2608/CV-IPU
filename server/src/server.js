const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: `./src/.env` });
const application = require('./application');

const port = process.env.PORT || 3001;

let DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
DB = DB.replace('<DBNAME>', 'ConservationVillageDB');

mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then(() => console.log('DataBase connection successful!'));

const server = application.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

module.exports = application;
