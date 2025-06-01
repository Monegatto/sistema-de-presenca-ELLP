import { AlunoRepository } from "../repositories/AlunoRepository"

export class AlunoService {
  private repository = new AlunoRepository()

  async criarAluno(oficina_id: number, nome: string) {
    const aluno = await this.repository.create(oficina_id, nome)
    return aluno
  }

  async listarAlunos() {
    return await this.repository.findAll()
  }
}
