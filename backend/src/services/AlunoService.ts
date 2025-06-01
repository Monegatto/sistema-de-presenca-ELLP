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

  async buscarPorId(id: number) {
    return await this.repository.findById(id)
  }

  async listarPorOficina(oficina_id: number) {
    return await this.repository.findByOficina(oficina_id)
  }

  async editarAluno(id: number, nome: string, oficina_id: number) {
    return await this.repository.update(id, nome, oficina_id)
  }

  async removerAluno(id: number) {
    return await this.repository.delete(id)
  }
}
