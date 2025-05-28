import express from 'express'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = express()
const prisma = new PrismaClient().$extends(withAccelerate())

async function main() {
  // const user = await prisma.responsavel.create({
  //   data: {
  //     name: 'Alice21312',
  //     email: 'alice123@prisma.io',
  //   },
  // })
  // console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

app.use(express.json())

app.get('/ping', (_, res) => {
  res.send('pong')
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
