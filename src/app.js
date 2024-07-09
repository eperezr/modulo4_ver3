
import express from 'express'
import morgan from 'morgan'

const app = express()

import usersRoutes from './routes/users.routers.js'
import tasksRoutes from './routes/tasks.routers.js'
import authRoutes from './routes/auth.routes.js'
import { authenticateToken } from './middlewares/authenticate.middleware.js'

//Middlware
app.use(morgan('dev'));
app.use(express.json())

app.use('/api/users', usersRoutes)
app.use('/api/tasks', authenticateToken, tasksRoutes)
app.use('/api/login', authRoutes)


export default app

