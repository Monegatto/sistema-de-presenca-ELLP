import express from 'express'
import { oficinaRouter } from './routes/Oficina.routes'

const app = express()
app.use(express.json())

app.use(oficinaRouter)

app.listen(3333, () => {
  console.log('Server running in http://localhost:3333')
})
