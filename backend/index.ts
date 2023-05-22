import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import Auth from "./controllers/Auth";
import jwt, {Secret} from 'jsonwebtoken'
import mongoose from "mongoose";
import PostController from "./controllers/PostController";
import UserController from "./controllers/UserInformation";
import path from "path";
import multer from 'multer';

dotenv.config()
const PORT = process.env.PORT;
export const privateKey = process.env.PRIVATE_KEY as Secret
const dbString = process.env.DB_STRING as string

const uploadMiddleware = multer({dest: 'images/',
limits: { fieldSize: 25 * 10000 * 10000 }})

const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(
    '/images',
     express.static(path.join(__dirname, './images'))
   );
mongoose.set('strictQuery', false)
mongoose.connect(dbString)
mongoose.connection.once('open', () => {console.log('Connected to database')})

const middlewareAuth = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers.authorization
    jwt.verify(token as string, privateKey, (err, decoded) => {
        if (err) {
            res.status(401).json({'message': 'Unauthorized, jwt was invalid or expired'})
        } else {
            next()
        }
    })
}

app.post('/login', Auth.login)
app.get('/session', middlewareAuth, Auth.session)
app.post('/register', Auth.register)
app.get('/user/:username', UserController.getUserInfo)
app.put('/profilepic/:name', middlewareAuth, UserController.changeProfilePic)
app.post('/newpost', middlewareAuth, PostController.createPost)
app.get('/post/:id', PostController.getSinglePost)
app.get('/user/post/:username', PostController.getPostByUser)
app.put('/post/like/:id', middlewareAuth, PostController.likeAPost)
app.post('/reply/:id', middlewareAuth, PostController.commentAPost)
app.get('/replies/:id', PostController.getReplies)
app.put('/follow/:id', middlewareAuth, UserController.followAnUser)
app.get('/user/:id/likes', PostController.getPostsLikedByAnUser)

app.listen(PORT, () => {
    console.log(`Server initialized at https://localhost:${PORT}`)
})