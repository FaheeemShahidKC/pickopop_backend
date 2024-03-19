import { createServer } from "./infrastructure/config/app";
import { connectDB } from "./infrastructure/config/connectDB";
import dotenv from 'dotenv'

dotenv.config()

const startServer = async ()=>{
     try {
          await connectDB()
          const app = createServer()
          const PORT = process.env.PORT || 3000
          app?.listen(PORT,()=>{
               console.log(`connected to server at port ${PORT}`);
          })
     } catch (error) {
          console.log(`error on starting the server ${error}`);
     }
}

startServer()