import { Router } from 'express'
import { ProfessorController } from '../controllers/ProfessorController'

const professorRouter = Router()
const controller = new ProfessorController()

professorRouter.post('/professores', async (req, res) => {
    try {
        await controller.criar(req, res)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

professorRouter.delete('/professores/:id', async (req, res) => {
    try {
        await controller.remover(req, res)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

export { professorRouter }
