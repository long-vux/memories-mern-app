import mongoose from 'mongoose'
import dotenv from 'dotenv' 

dotenv.config()

const CONNECTION_URL = process.env.MONGODB_URI;

if (!CONNECTION_URL) {
    console.error('MONGODB_URI is not defined in .env file');
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_URL)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

export default connectDB;
