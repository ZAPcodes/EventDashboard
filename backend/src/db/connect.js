import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://techboyabhinav:nQs56jDI06XLSn0m@cluster0.nt8mj.mongodb.net/");
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
};
export default connectDB;
//nQs56jDI06XLSn0m