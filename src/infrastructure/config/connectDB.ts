import { log } from 'console'
import mongoose from 'mongoose'

export const connectDB = () => {
     try {
          const mongoURI = process.env.MONGODB_URI as string
          mongoose.connect(mongoURI)
          console.log("Database connected");
          
     } catch (error) {
          console.error('An error occurred while connecting the mongoDB:', error);
     }
}