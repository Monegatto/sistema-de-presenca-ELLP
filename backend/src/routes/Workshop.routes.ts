/// <reference path="../types/express/index.d.ts" />
import { Router } from 'express'
import { WorkshopController } from '../controllers/WorkshopController'
import { authenticateToken } from '../middlewares/authMiddleware'

const workshopRouter = Router()
const controller = new WorkshopController()

workshopRouter.post('/workshops', authenticateToken, async (req, res) => {
  try {
    await controller.create(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

workshopRouter.get('/workshops', authenticateToken, async (req, res) => {
  try {
    await controller.list(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

workshopRouter.get('/workshops/:id', authenticateToken, async (req, res) => {
  try {
    await controller.getById(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

workshopRouter.put('/workshops/:id', authenticateToken, async (req, res) => {
  try {
    await controller.update(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

workshopRouter.delete('/workshops/:id', authenticateToken, async (req, res) => {
  try {
    await controller.remove(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { workshopRouter }
