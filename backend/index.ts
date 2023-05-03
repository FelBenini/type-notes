import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'
import jwt, { Secret } from "jsonwebtoken";

dotenv.config()
const PORT = process.env.PORT;
const privateKey: Secret = process.env.PRIVATE_KEY as Secret

const app: Express = express()

app.get('/:name', (req: Request, res: Response) => {
    const {name} = req.params || 'Joe'
    const token = jwt.sign({name: name}, privateKey)
    res.status(200).json({'Your key is': token})
})

app.listen(PORT, () => {
    console.log('This should work')
})