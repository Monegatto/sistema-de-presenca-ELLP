import express from 'express'
import { oficinaRouter } from './routes/Oficina.routes'

const cors = require('cors')
const app = express()

app
  .use(express.json())
  .use(cors())
  .use(oficinaRouter)

app.listen(3333, () => {
  console.log('Server running in http://localhost:3333')
})
