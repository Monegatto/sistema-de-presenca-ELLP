import { Professor } from '../models/Professor'
import { ProfessorRepository } from '../repositories/ProfessorRepository'

export class ProfessorService {
    constructor(private repository: ProfessorRepository) { }

    async criarProfessor(
        nome: string,
        usuario: string,
        senha: string,
        oficina_id: number | null
    ): Promise<Professor> {
        const professor = new Professor(0, nome, usuario, senha, oficina_id ?? null)
        return await this.repository.create(professor)
    }

    async removerProfessor(id: number) {
        return await this.repository.delete(id)
    }
}
