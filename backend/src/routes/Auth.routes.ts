/// <reference path="../types/express/index.d.ts" />
import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

const authRouter = Router()
const controller = new AuthController()

authRouter.post('/login', async (req, res) => {
    try {
        await controller.login(req, res)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

export { authRouter }