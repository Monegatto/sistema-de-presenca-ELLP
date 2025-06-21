/// <reference path="../types/express/index.d.ts" />
import { Router } from 'express'
import { TeacherController } from '../controllers/TeacherController'
import { authenticateToken } from '../middlewares/authMiddleware'

const teacherRouter = Router()
const controller = new TeacherController()

teacherRouter.post('/teachers', authenticateToken, async (req, res) => {
    try {
        await controller.create(req, res)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

teacherRouter.delete('/teachers/:id', authenticateToken, async (req, res) => {
    try {
        await controller.remove(req, res)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

export { teacherRouter }
