import express from 'express'
import { oficinaRouter } from './routes/Oficina.routes'
import { alunoRouter } from './routes/Alunos.routes'
import { professorRouter } from './routes/Professor.routes'

const cors = require('cors')
const app = express()

app
  .use(express.json())
  .use(cors())
  .use(oficinaRouter)
  .use(alunoRouter)
  .use(professorRouter)

app.listen(3333, () => {
  console.log('Server running in http://localhost:3333')
})
