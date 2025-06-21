import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { TeacherRepository } from '../repositories/TeacherRepository'

export class AuthController {
  private teacherRepo = new TeacherRepository()
  private adminCredentials = { username: 'admin', password: 'password' }
  private SECRET_KEY = process.env.SECRET_KEY

  async login(req: Request, res: Response) {
    if (!this.SECRET_KEY) {
      return res.status(500).json({ error: 'SECRET_KEY is not set' })
    }

    const { username, password } = req.body
    if (!username || !password) {
      return res.status(401).json({ error: 'Username or password cannot be null' })
    }

    if (username === this.adminCredentials.username && password === this.adminCredentials.password) {
      const token = jwt.sign({ userType: 'admin', username }, this.SECRET_KEY, { expiresIn: '24h' })
      return res.status(200).json({ token })
    }

    try {
      const teacher = await this.teacherRepo.findByUsername(username)
      if (!teacher) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Aqui compara senha direto, ou faça validação hash se usar
      if (teacher.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Cria token com dados do teacher
      const token = jwt.sign(
        { userType: 'teacher', username: teacher.username, teacherId: teacher.id },
        this.SECRET_KEY,
        { expiresIn: '24h' }
      )

      return res.status(200).json({ token })
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
