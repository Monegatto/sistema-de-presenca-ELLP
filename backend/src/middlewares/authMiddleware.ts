/// <reference path="../types/express/index.d.ts" />
import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const SECRET_KEY = process.env.SECRET_KEY
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.sendStatus(401)
        return
    }

    if (!SECRET_KEY) {
        res.sendStatus(500)
        return
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.sendStatus(403)
            return
        }

        req.user = decoded
        next()
    })
}

export const authenticateTokenAdmin = (req: Request, res: Response, next: NextFunction) => {
    const SECRET_KEY = process.env.SECRET_KEY
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.sendStatus(401)
        return
    }

    if (!SECRET_KEY) {
        res.sendStatus(500)
        return
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.sendStatus(403)
            return
        }

        req.user = decoded

        if ((req.user as any).userType !== 'admin') {
            res.status(403).json({ error: 'Access denied, admin only' })
            return
        }

        next()
    })
}

