import { Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from 'dotenv'
import { validate } from 'email-validator'
import userModel from "../models/UserModel"
import { privateKey } from '../index'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)
dotenv.config()

export interface IPayLoadJwt extends JwtPayload {
    username: string,
    iat: number,
    exp: number
}

export function decodeJwtUsername(token: string | undefined) {
    if (token) {
        const decoded: IPayLoadJwt = jwt.verify(token as string, privateKey) as IPayLoadJwt
        return decoded.username
    }
    return undefined
}

export default class Auth {
    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body
        const user = await userModel.findOne({ username: username })
        if (!user) {
            res.status(404).json({ 'message': 'Username was incorrect' })
            return
        }
        const passVerification = bcrypt.compareSync(password, user.password)
        if (!passVerification) {
            res.status(401).json({ 'message': 'Unauthorized, invalid credentials' })
            return
        }
        const token = jwt.sign({ 'username': username }, privateKey, { expiresIn: '60 days' })
        res.status(200).json({ 'token': token })
    }

    static session = (req: Request, res: Response) => {
        const token: string | undefined = req.headers.authorization
        const session = jwt.verify(token as string, privateKey)
        res.status(200).json({ 'session': session })
    }

    static register = async (req: Request, res: Response) => {
        const { username, password, email } = req.body
        try {
            if (!validate(email)) {
                throw new Error('Invalid e-mail')
                return
            } else {
                try {
                    let userExist = await userModel.findOne({ "$or": [{ email: req.body.email }, { username: req.body.username }] })
                    if (userExist) {
                        throw new Error('Username or e-mail already taken')
                    }
                } catch (error: any) {
                    res.status(409).json({ 'message': error.message })
                    return
                }
            }
        } catch (error: any) {
            res.status(400).json({ 'message': error.message })
            return
        }
        let newUser = await new userModel({
            username: username,
            displayName: username,
            password: bcrypt.hashSync(password, salt),
            email: email
        })
        newUser.save()
        res.status(200).json({ newUser })
    }
}