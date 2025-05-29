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
}
