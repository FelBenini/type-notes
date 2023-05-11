import { Request, Response } from "express"
import userModel from "../models/UserModel"
import { decodeJwtUsername } from './Auth'

export default class UserController {
    static getUserInfo = async (req: Request, res: Response) => {
        const { username } = req.params
        const userInfo = await userModel.findOne({ username: username }, '_id -password -__v')
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

    static followAnUser = async (req: Request, res: Response) => {
        const {id} = req.params //this is the user that is going to be followed ID
        const reqUser: string = decodeJwtUsername(req.headers.authorization as string) as string
        const reqUserInfo = await userModel.findOne({ username: reqUser }, '_id')
        const reqUserId = reqUserInfo?._id
        if (reqUserId) {
            const userAddres = await userModel.findById(id)
            if (userAddres) {
                if (userAddres.followers.includes(reqUserId)) {
                    const userToBeFollowed = await userModel.findByIdAndUpdate(id, {$inc: {followerCount: -1}, '$pull': {followers: reqUserId}})

                    const userThatIsRequesting = await userModel.findByIdAndUpdate(reqUserId, {$inc: {followingCount: -1}, '$pull': {following: userAddres._id}})
                    res.json({'message': 'User was unfollowed'})
                    return
                } else {
                    const userToBeFollowed = await userModel.findByIdAndUpdate(id, {$inc: {followerCount: 1}, $push: {followers: reqUserId}})

                    const userThatIsRequesting = await userModel.findByIdAndUpdate(reqUserId, {$inc: {followingCount: 1}, $push: {following: userAddres._id}})
                    res.json({'message': 'User was follwoed'})
                    return
                }
            }
        }
        res.status(401).json({'message': 'Bad request'})
        return
    }
}