import express from 'express'
import cors from 'cors'
import {router} from '../routes/usuario.routes.js'
import DBConnection from '../config/db.js'


export class Server {

    constructor(){
        this.app = express()
        this.port= process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.conectarDB()
        this.middlewares()
        this.routes()

    }

        middlewares(){
            this.app.use(cors())
            this.app.use(express.json())
            this.app.use(express.static('public'))
        }


        routes(){
          this.app.use(this.usuariosPath, router)
        }
        async conectarDB(){
            await DBConnection()
        }

        listen(){
            this.app.listen(this.port, ()=>{
                console.log(`Servidor corriendo en ${this.port}`)
            })
        }
    
}