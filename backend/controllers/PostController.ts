import { Request, Response } from "express"
import postModel from "../models/PostModel"
import { decodeJwtUsername } from './Auth'
import userModel from "../models/UserModel"

export default class PostController {
    static createPost = async (req: Request, res: Response) => {
        const token: string = req.headers.authorization as string
        const userNameAuth = decodeJwtUsername(token)
        const postedById = await userModel.findOne({ username: userNameAuth })
        let newPost = await new postModel({
            postedBy: postedById,
            content: req.body.content
        })
        newPost.save()
        res.status(200).send('post saved')
    }

    static getSinglePost = async (req: Request, res: Response) => {
        const { id } = req.params
        const post = await postModel.findById(id)
            .populate('postedBy', '-_id -password -email -__v')
            .populate('likedBy', 'username displayName followerCount followingCount profilePic -_id')
            .lean() as any
        const userReq = decodeJwtUsername(req.headers.authorization) || undefined
        if (post) {
            if (userReq) {
                if (post.likedBy && post.likedBy.length > 0) {
                    post.liked = post.likedBy.some((user: any) => user.username.toUpperCase() === userReq.toUpperCase());
                } else {
                    post.liked = false;
                }
            }
            res.status(200).json(post)
            return
        }
        res.status(404).json({ 'message': 'Post was not found' })
    }

    static getPostByUser = async (req: Request, res: Response) => {
        const { username } = req.params
        let page: number | string = req.query.page as string || 0 as number
        const limit: number = parseInt(req.query.limit as string) as number || 15 as number
        const user = await userModel.findOne({ username: username })
        const userId = user?._id
        const userReq = decodeJwtUsername(req.headers.authorization) || undefined
        if (userId) {
            const posts = await postModel
                .find({ postedBy: userId })
                .limit(limit as number * 1)
                .skip((page as number) * limit as number)
                .populate('postedBy', '-_id -password -email -__v')
                .populate('likedBy', '-_id -password -email -__v')
                .sort({ createdAt: -1 })
                .lean();
            if (userReq) {
                posts.forEach((post: any) => {
                    if (post.likedBy && post.likedBy.length > 0) {
                        post.liked = post.likedBy.some((user: any) => user.username.toUpperCase() === userReq.toUpperCase());
                    } else {
                        post.liked = false;
                    }
                });
            }

            const count = await postModel.find({ postedBy: userId }).count()
            res.status(200).json({ postsCount: count, posts: posts })
            return
        }
        res.status(404).json({ 'message': 'User was not found' })
    }

    static likeAPost = async (req: Request, res: Response) => {
        const { id } = req.params
        const username = decodeJwtUsername(req.headers.authorization as string)
        const user = await userModel.findOne({ username: username })
        const userId = user?._id
        if (userId) {
            const postAddress = await postModel.findById(id)
            if (postAddress) {
                if (postAddress.likedBy.includes(userId)) {
                    const post = await postModel.findByIdAndUpdate(id, { $inc: { likesCount: -1 }, "$pull": { "likedBy": userId } })
                    res.status(200).json({ 'message': 'like was removed' })
                } else {
                    const post = await postModel.findByIdAndUpdate(id, { $inc: { likesCount: 1 }, "$push": { "likedBy": userId } })
                    res.status(200).json({ 'message': 'post was liked' })
                }
                return
            }
        }

        res.status(404).json()

    }

    static commentAPost = async (req: Request, res: Response) => {
        const username = decodeJwtUsername(req.headers.authorization as string)
        const user = await userModel.findOne({ username: username })
        const userId = user?._id
        if (userId) {
            const reply = await new postModel({
                postedBy: user,
                content: req.body.content,
                type: 'reply'
            })
            reply.save()
            const post = await postModel.findByIdAndUpdate(req.params.id, {$inc: {replyCount: 1}, '$push': {replies: reply._id}})
            .exec()
            res.json({'message': 'Post replied'})
            return
        }
        res.status(404).json({message: 'User not found'})
    }

    static getReplies = async (req: Request, res: Response) => {
        const {id} = req.params
        const post = await postModel.findById(id)
        .populate({path: 'replies', populate: {path: 'postedBy'}})
        .exec()
        if (post) {
           res.json(post.replies)
           return
        }
        res.status(404).json({'message': 'Post was not found'})
    }
}