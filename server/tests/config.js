const mongoose = require('mongoose');

exports.connectDB = () => {
    let DB = process.env.DATABASE.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
    );
    DB = DB.replace('<DBNAME>', 'jesttestDB');

    mongoose
        .connect(DB, {
            useNewUrlParser: true,
        })
        .then(() => console.log('DataBase connection successful!'));
};

exports.closeDB = async () => {
    console.log(`Connection to DB closed!!`);
    await mongoose.connection.close();
};

exports.BASE_API = '/api/v1';
