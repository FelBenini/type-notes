import { Request, Response } from "express"
import jwt, { Secret } from "jsonwebtoken"
import dotenv from 'dotenv'
import {validate} from 'email-validator'

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

    static register = async (req: Request, res: Response) => {
        const {username, password, email} = req.body
        try {
            if (!validate(email)) {
                throw new Error('Invalid e-mail')
            }
        } catch (error: any) {
            res.status(400).json({'message': error.message})
        }
        res.status(200).json({username, password, email})
    }
}