import { Oficina } from '../models/Oficina'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class OficinaRepository {
  async create(oficina: Omit<Oficina, 'id'>): Promise<Oficina> {
    const result = await prisma.oficina.create({
      data: {
        nome: oficina.nome,
        dias: oficina.dias,
        coordenador: oficina.coordenador,
        horario: oficina.horario
      }
    })

    return new Oficina(
      result.id,
      result.nome,
      result.dias,
      result.coordenador,
      result.horario
    )
  }
}
