import mongoose from 'mongoose';
import colors from 'colors';


const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is not defined in env');
    await mongoose.connect(uri, { autoIndex: true });
    console.log('MongoDB connected'.green);
};


export default connectDB;