import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import adminRouter from '../routes/adminRoute'
import userRouter from '../routes/userRoute'

export const createServer = () => {
     try {
          const app = express()
          app.use(express.json())
          app.use(express.urlencoded({ extended: true }))
          app.use(cookieParser())
          app.use(
               cors({
                    origin: 'http://localhost:5173',
                    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                    credentials: true
               })
          )
          app.use('/', userRouter)
          app.use('/admin', adminRouter)
          app.use((req, res) => {
               res.status(404).send('It is Not Found');
          });
          return app

     } catch (error) {
          console.error('An error occurred while setting up the server:', error);
     }
} 