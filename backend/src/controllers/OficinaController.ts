import { Request, Response } from 'express'
import { OficinaRepository } from '../repositories/OficinaRepository'
import { OficinaService } from '../services/OficinaService'

const repository = new OficinaRepository()
const service = new OficinaService(repository)

export class OficinaController {
    async criar(req: Request, res: Response) {
        const { nome, dias, coordenador, horario } = req.body

        if (!nome) {
            return res.status(400).json({ error: 'Nome é obrigatório' })
        }

        const oficina = await service.criarOficina(nome, dias || null, coordenador || null, horario || null)

        return res.status(201).json(oficina)
    }
    
    async listar(req: Request, res: Response) {
        const oficinas = await service.listarOficinas()
        return res.status(200).json(oficinas)
    }

    async buscarPorId(req: Request, res: Response) {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' })
        }

        const oficina = await service.buscarOficinaPorId(id)

        if (!oficina) {
            return res.status(404).json({ error: 'Oficina não encontrada' })
        }

        return res.status(200).json(oficina)
    }
}
