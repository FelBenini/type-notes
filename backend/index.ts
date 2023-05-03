import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import Auth from "./controllers/Auth";
import jwt, {Secret} from 'jsonwebtoken'
import mongoose from "mongoose";
import UserController from "./controllers/UserInformation";

dotenv.config()
const PORT = process.env.PORT;
export const privateKey = process.env.PRIVATE_KEY as Secret
const dbString = process.env.DB_STRING as string

const app: Express = express()
app.use(cors())
app.use(express.json())

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

app.listen(PORT, () => {
    console.log(`Server initialized at https://localhost:${PORT}`)
})