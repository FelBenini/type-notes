import { Request, Response } from "express"
import userModel from "../models/UserModel"

export default class UserController {
    static getUserInfo = async (req: Request, res: Response) => {
        const {username} = req.params
        const userInfo = await userModel.findOne({username: username}, '-_id -password -__v')
        if (userInfo) {
            res.status(200).json(userInfo)
            return
        }
        res.status(404).json({'message': 'User does not exist'})
    }
}