/// <reference path="../types/express/index.d.ts" />
import { Router } from 'express'
import { AttendanceController } from '../controllers/AttendanceController'
import { authenticateToken } from '../middlewares/authMiddleware'

const attendanceRouter = Router()
const controller = new AttendanceController()

attendanceRouter.post('/attendances', authenticateToken, async (req, res) => {
  try {
    await controller.create(req, res)
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Internal server error' })
  }
})

attendanceRouter.get('/attendances', authenticateToken, async (req, res) => {
  try {
    await controller.getAll(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

attendanceRouter.get('/attendances/:id', authenticateToken, async (req, res) => {
  try {
    await controller.getById(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

attendanceRouter.get('/workshops/:workshopId/attendances/by-date', authenticateToken, async (req, res) => {
  try {
    await controller.getByWorkshopAndDate(req, res)
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
})

attendanceRouter.put('/attendances/:id', authenticateToken, async (req, res) => {
  try {
    await controller.update(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

attendanceRouter.delete('/attendances/:id', authenticateToken, async (req, res) => {
  try {
    await controller.delete(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { attendanceRouter }
