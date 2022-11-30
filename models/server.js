import express from 'express'


export class Server {

    constructor(){
        this.app = express()
        this.port= process.env.PORT
        this.middlewares()
        this.routes()

    }

        middlewares(){
            this.app.use(express.static('public'))
        }


        routes(){
            this.app.get('/hello', (req,res)=>{
                res.send("Hello World!")
            })
        }

        listen(){
            this.app.listen(this.port, ()=>{
                console.log(`Servidor corriendo en ${this.port}`)
            })
        }
    
}