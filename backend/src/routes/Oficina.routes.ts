import { Router } from 'express'
import { OficinaController } from '../controllers/OficinaController'

const oficinaRouter = Router()
const controller = new OficinaController()

oficinaRouter.post('/oficinas', async (req, res) => {
    try {
        await controller.criar(req, res)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

oficinaRouter.get('/oficinas', async (req, res) => {
    try {
        await controller.listar(req, res)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

oficinaRouter.get('/oficinas/:id', async (req, res) => {
    try {
        await controller.buscarPorId(req, res)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

oficinaRouter.put('/oficinas/:id', async (req, res) => {
    try {
        await controller.editar(req, res)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})


export { oficinaRouter }
