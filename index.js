import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import cors from 'cors';
// import bodyParser from 'body-parser';

dotenv.config();
// connectDB()

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;


try {
    mongoose.connect(process.env.MONGODB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
} catch (error) {
    console.log('MongoDB connection failed');
    process.exit(1);
}

const app = express();

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})