import { Request, Response } from "express"
import postModel from "../models/PostModel"
import { decodeJwtUsername } from './Auth'
import userModel from "../models/UserModel"

export default class PostController {
    static creatPost = async (req: Request, res: Response) => {
        const token: string = req.headers.authorization as string
        const userNameAuth = decodeJwtUsername(token)
        const postedById = await userModel.findOne({username: userNameAuth})
        let newPost = await new postModel({
            postedBy: postedById,
            content: req.body.content
        })
        newPost.save()
        res.status(200).send('post saved')
    }

    static getSinglePost = async (req: Request, res: Response) => {
        const {id} = req.params
        const post = await postModel.findById(id)
        .populate('postedBy', '-_id -password -email -__v')
        .exec()
        res.status(200).json(post)
    }
}