import express from 'express'
import cors from 'cors'


export class Server {

    constructor(){
        this.app = express()
        this.port= process.env.PORT
        this.middlewares()
        this.routes()

    }

        middlewares(){
            this.app.use(cors())
            this.app.use(express.static('public'))
        }


        routes(){
            this.app.get('/api', (req,res)=>{
                res.json({
                    msg: 'Es una petición get API'
                })
            })
            this.app.put('/api', (req,res)=>{
                res.json({
                    msg: 'Es una petición put API'
                })
            })
            this.app.post('/api', (req,res)=>{
                res.json({
                    msg: 'Es una petición post API'
                })
            })
            this.app.delete('/api', (req,res)=>{
                res.json({
                    msg: 'Es una petición delete API'
                })
            })
        }

        listen(){
            this.app.listen(this.port, ()=>{
                console.log(`Servidor corriendo en ${this.port}`)
            })
        }
    
}