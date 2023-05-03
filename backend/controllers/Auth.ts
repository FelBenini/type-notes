import { Request, Response } from "express"
import jwt, { Secret } from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

const privateKey: Secret = process.env.PRIVATE_KEY as Secret

export default class Auth {
    static login = (req: Request, res: Response) => {
        const {username} = req.body
        const token = jwt.sign({'username': username}, privateKey, {expiresIn: '60 days'})
        res.status(200).json({'token': token})
    }

    static session = (req: Request, res: Response) => {
        const token: string | undefined = req.headers.authorization
        const session = jwt.verify(token as string, privateKey)
        res.status(200).json({'session': session})
    }
}