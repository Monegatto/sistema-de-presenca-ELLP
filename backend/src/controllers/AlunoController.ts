import { Request, Response } from 'express'
import { AlunoService } from '../services/AlunoService'

const service = new AlunoService()

export class AlunoController {
  async criar(req: Request, res: Response) {
    const { oficina_id, nome } = req.body

    if (!oficina_id || !nome) {
      return res.status(400).json({ error: 'oficina_id e nome são obrigatórios' })
    }

    const aluno = await service.criarAluno(oficina_id, nome)
    return res.status(201).json(aluno)
  }

  async listar(req: Request, res: Response) {
    const alunos = await service.listarAlunos()
    return res.status(200).json(alunos)
  }
}
