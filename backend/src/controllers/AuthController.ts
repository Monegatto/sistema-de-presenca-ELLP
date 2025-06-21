import { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export class AuthController {
    async login(req: Request, res: Response) {
        const credentials = { email: 'admin', senha: 'password' }

        const SECRET_KEY = process.env.SECRET_KEY;

        const { username, password } = req.body;
        if (!SECRET_KEY) {
            return res.status(500).json({ error: 'SECRET_KEY is not set in environment variables' });
        }
        if (!username || !password) {
            return res.status(401).json({ error: 'Username or password cannot be null' });
        } else if (username === credentials.email && password === credentials.senha) {
            const token = jwt.sign({ user: credentials }, SECRET_KEY, { expiresIn: '24h' });
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    }
}