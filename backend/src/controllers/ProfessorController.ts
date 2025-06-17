import { Request, Response } from 'express'
import { ProfessorService } from '../services/ProfessorService'
import { ProfessorRepository } from '../repositories/ProfessorRepository'

const repository = new ProfessorRepository()
const service = new ProfessorService(repository)

export class ProfessorController {
  async criar(req: Request, res: Response) {
    const { nome, usuario, senha, oficina_id } = req.body

    if (!nome || !usuario || !senha) {
      return res.status(400).json({ error: 'nome, usuario e senha são obrigatórios' })
    }

    try {
      const professor = await service.criarProfessor(nome, usuario, senha, oficina_id)
      return res.status(201).json(professor)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar professor', detail: error })
    }
  }
}
