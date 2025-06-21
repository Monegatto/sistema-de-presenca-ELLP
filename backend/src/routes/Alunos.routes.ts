import { Router } from 'express'
import { AlunoController } from '../controllers/AlunoController'
import { authenticateToken } from '../middlewares/authMiddleware'
import './types/express'

const alunoRouter = Router()
const controller = new AlunoController()

alunoRouter.post('/alunos', authenticateToken, async (req, res) => {
	try {
		await controller.criar(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
})

alunoRouter.get('/alunos', async (req, res) => {
	try {
		await controller.listar(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
})

alunoRouter.get('/alunos/:id', async (req, res) => {
	try {
		await controller.buscarPorId(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
})

alunoRouter.get('/oficinas/:oficinaId/alunos', async (req, res) => {
	try {
		await controller.listarPorOficina(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
})

alunoRouter.put('/alunos/:id', async (req, res) => {
	try {
		await controller.editar(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
})

alunoRouter.delete('/alunos/:id', async (req, res) => {
	try {
		await controller.remover(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
})

export { alunoRouter }
