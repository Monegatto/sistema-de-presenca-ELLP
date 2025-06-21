import express from 'express'
import { workshopRouter } from './routes/Workshop.routes'
import { studentRouter } from './routes/Student.routes'
import { teacherRouter } from './routes/Teacher.routes'
import { authRouter } from './routes/Auth.routes'

const cors = require('cors')
const app = express()

app
  .use(express.json())
  .use(cors())
  .use(workshopRouter)
  .use(studentRouter)
  .use(teacherRouter)
  .use(authRouter)

app.listen(3333, () => {
  console.log('Server running in http://localhost:3333')
})
