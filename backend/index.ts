import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import Auth from "./controllers/Auth";
import jwt, {Secret} from 'jsonwebtoken'

dotenv.config()
const PORT = process.env.PORT;
const privateKey = process.env.PRIVATE_KEY as Secret

const app: Express = express()
app.use(cors())
app.use(express.json())

const middlewareAuth = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers.authorization
    jwt.verify(token as string, privateKey, (err, decoded) => {
        if (err) {
            res.status(401).json({'message': 'Unauthorized'})
        } else {
            next()
        }
    })
}

app.get('/login', Auth.login)
app.get('/session', middlewareAuth, Auth.session)

//app.get('/:name', (req: Request, res: Response) => {
//    const {name} = req.params || 'Joe'
//    const token = jwt.sign({name: name}, privateKey, {expiresIn: '60 days'})
//    res.status(200).json({'Your key is': token})
//})

//app.get('/decode/:key', middlewareAuth, (req: Request, res: Response) => {
//    const {key} = req.params
//    const session = jwt.verify(key, privateKey)
//    res.status(200).json({session})
//})

app.listen(PORT, () => {
    console.log(`Server initialized at https://localhost:${PORT}`)
})