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

  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' })
    }

    const aluno = await service.buscarPorId(id)

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    return res.status(200).json(aluno)
  }

  async listarPorOficina(req: Request, res: Response) {
    const oficinaId = Number(req.params.oficinaId)

    if (isNaN(oficinaId)) {
      return res.status(400).json({ error: 'ID de oficina inválido' })
    }

    const alunos = await service.listarPorOficina(oficinaId)

    return res.status(200).json(alunos)
  }

  async editar(req: Request, res: Response) {
    const id = Number(req.params.id)
    const { nome, oficina_id } = req.body

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' })
    }

    if (!nome || !oficina_id) {
      return res.status(400).json({ error: 'nome e oficina_id são obrigatórios' })
    }

    const alunoExistente = await service.buscarPorId(id)

    if (!alunoExistente) {
      return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    const aluno = await service.editarAluno(id, nome, oficina_id)
    return res.status(200).json(aluno)
  }

  async remover(req: Request, res: Response) {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' })
    }

    const alunoExistente = await service.buscarPorId(id)

    if (!alunoExistente) {
      return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    await service.removerAluno(id)
    return res.status(204).send()
  }
}
