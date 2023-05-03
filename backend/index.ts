import express, { Express, Request, Response } from "express";

const app: Express = express()

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({'message': 'Hello world!'})
})

app.listen(4000, () => {
    console.log('This should work')
})