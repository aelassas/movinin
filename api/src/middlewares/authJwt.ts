import { Request, Response, NextFunction } from 'express'
import process from 'node:process'
import jwt from 'jsonwebtoken'

const JWT_SECRET: string = String(process.env.BC_JWT_SECRET)

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const header = req.headers['x-access-token']

  if (!header) {
    return res.status(403).send({ message: 'No token provided!' })
  }

  const token: string = String(Array.isArray(header) && header.length > 0 ? header[0] : header)

  jwt.verify(token, JWT_SECRET, (err) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: 'Unauthorized!' })
    }

    next()
  })
}

export default { verifyToken }
