import { Request, Response } from "express"
import userModel from "../models/UserModel"
import { decodeJwtUsername } from './Auth'

export default class UserController {
    static getUserInfo = async (req: Request, res: Response) => {
        const { username } = req.params
        const userInfo = await userModel.findOne({ username: username }, '-_id -password -__v')
        if (userInfo) {
            res.status(200).json(userInfo)
            return
        }
        res.status(404).json({ 'message': 'User does not exist' })
    }

    static changeProfilePic = async (req: Request, res: Response) => {
        const token: string = req.headers.authorization as string
        const userNameAuth = decodeJwtUsername(token)
        const username = req.params.name
        if (userNameAuth?.toUpperCase() != username.toUpperCase()) {
            res.status(409).json({ 'message': 'unauthorized' })
            return
        }
        res.status(200).json({ 'message': 'you are authorized to change your profile pic' })
    }
}