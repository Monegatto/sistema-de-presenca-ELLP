import { Oficina } from '../models/Oficina'
import { OficinaRepository } from '../repositories/OficinaRepository'

export class OficinaService {
    constructor(private repository: OficinaRepository) { }

    async criarOficina(nome: string, dias: string | null, coordenador: string | null, horario: string | null): Promise<Oficina> {
        const oficina = new Oficina(0, nome, dias, coordenador, horario)
        return await this.repository.create(oficina)
    }

    async listarOficinas() {
        return await this.repository.findAll()
    }

    async buscarOficinaPorId(id: number): Promise<Oficina | null> {
        const oficinas = await this.repository.findAll()
        return oficinas.find(oficina => oficina.id === id) || null
    }

    async editarOficina(id: number, nome?: string, dias?: string | null, coordenador?: string | null, horario?: string | null) {
        const oficina = await this.repository.update(id, { nome, dias, coordenador, horario })
        return oficina
    }

    async removerOficina(id: number) {
        const oficina = await this.repository.delete(id)
        return oficina
    }


}
