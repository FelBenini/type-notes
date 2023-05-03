import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'
import jwt, { Secret } from "jsonwebtoken";
import cors from 'cors'

dotenv.config()
const PORT = process.env.PORT;
const privateKey: Secret = process.env.PRIVATE_KEY as Secret

const app: Express = express()
app.use(cors())

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

app.get('/:name', (req: Request, res: Response) => {
    const {name} = req.params || 'Joe'
    const token = jwt.sign({name: name}, privateKey, {expiresIn: '60 days'})
    res.status(200).json({'Your key is': token})
})

app.get('/decode/:key', middlewareAuth, (req: Request, res: Response) => {
    const {key} = req.params
    const session = jwt.verify(key, privateKey)
    res.status(200).json({session})
})

app.listen(PORT, () => {
    console.log('This should work')
})