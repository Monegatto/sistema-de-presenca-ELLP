/// <reference path="../types/express/index.d.ts" />
import { Router } from 'express'
import { StudentController } from '../controllers/StudentController'
import { authenticateToken } from '../middlewares/authMiddleware'

const studentRouter = Router()
const controller = new StudentController()

studentRouter.post('/students', authenticateToken, async (req, res) => {
  try {
    await controller.create(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

studentRouter.get('/students', async (req, res) => {
  try {
    await controller.list(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

studentRouter.get('/students/:id', async (req, res) => {
  try {
    await controller.getById(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

studentRouter.get('/workshops/:workshopId/students', async (req, res) => {
  try {
    await controller.listByWorkshop(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

studentRouter.put('/students/:id', async (req, res) => {
  try {
    await controller.update(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

studentRouter.delete('/students/:id', async (req, res) => {
  try {
    await controller.remove(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { studentRouter }
