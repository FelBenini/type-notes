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
        if (post) {
          res.status(200).json(post)
          return
        }
        res.status(404).json({'message': 'Post was not found'})        
    }

    static getPostByUser = async (req: Request, res: Response) => {
        const {username} = req.params
        const user = await userModel.findOne({username: username})
        const userId = user?._id
        if (userId) {
            const posts = await postModel.find({postedBy: userId}).populate('postedBy', '-_id -password -email -__v').sort({createdAt: -1}).exec()
            res.status(200).json(posts)
        }
    }
}