/// <reference path="../types/express/index.d.ts" />
import { Router } from 'express'
import { TeacherController } from '../controllers/TeacherController'
import { authenticateTokenAdmin } from '../middlewares/authMiddleware'

const teacherRouter = Router()
const controller = new TeacherController()

teacherRouter.post('/teachers', authenticateTokenAdmin, async (req, res) => {
  try {
    await controller.create(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

teacherRouter.delete('/teachers/:id', authenticateTokenAdmin, async (req, res) => {
  try {
    await controller.remove(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

teacherRouter.get('/teachers/username/:username', async (req, res) => {
  try {
    await controller.findByUsername(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

teacherRouter.get('/teachers/admin', authenticateTokenAdmin, async (req, res) => {
  try {
    await controller.findAll(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

teacherRouter.get('/teachers/:id', authenticateTokenAdmin, async (req, res) => {
  try {
    await controller.findById(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

teacherRouter.get('/teachers', async (req, res) => {
  try {
    await controller.findAll(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

teacherRouter.put('/teachers/:id', authenticateTokenAdmin, async (req, res) => {
  try {
    await controller.update(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

teacherRouter.put('/teachers/forgot-password/:username', async (req, res) => {
  try {
    await controller.setForgotPassword(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { teacherRouter }
