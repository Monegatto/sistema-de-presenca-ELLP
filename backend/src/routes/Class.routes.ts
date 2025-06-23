/// <reference path="../types/express/index.d.ts" />
import { Router } from 'express'
import { ClassController } from '../controllers/ClassController'
import { authenticateToken } from '../middlewares/authMiddleware'

const classRouter = Router()
const controller = new ClassController()

classRouter.post('/classes', authenticateToken, async (req, res) => {
  try {
    await controller.create(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

classRouter.get('/classes', authenticateToken, async (req, res) => {
  try {
    await controller.list(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

classRouter.get('/classes/:id', authenticateToken, async (req, res) => {
  try {
    await controller.getById(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

classRouter.get('/workshops/:workshopId/classes', authenticateToken, async (req, res) => {
  try {
    await controller.listByWorkshop(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

classRouter.put('/classes/:id', authenticateToken, async (req, res) => {
  try {
    await controller.update(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

classRouter.delete('/classes/:id', authenticateToken, async (req, res) => {
  try {
    await controller.delete(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { classRouter }
