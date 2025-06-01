import { Router } from 'express'
import { AlunoController } from '../controllers/AlunoController'

const alunoRouter = Router()
const controller = new AlunoController()

alunoRouter.post('/alunos', async (req, res) => {
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


export { alunoRouter }
