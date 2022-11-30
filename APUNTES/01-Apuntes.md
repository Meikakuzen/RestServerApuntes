# RestServer

- Install express y dotenv
- Creo el archivo .env con la variable de PORT=8080
- Importo dotenv en app.js y lo uso con dotenv.config() 

~~~js
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/', (req, res)=>{
    res.send("Hello World!")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en ${process.env.PORT}`)
})
~~~
----

# Express basado en clases

- Creo una clase server

~~~js
import express from 'express'


export class Server {

    constructor(){
        this.app = express()
        this.port= process.env.PORT
        this.routes()
    }


        routes(){
            this.app.get('/', (req,res)=>{
                res.send("Hello World!")
            })
        }

        listen(){
            this.app.listen(this.port, ()=>{
                console.log(`Servidor corriendo en ${this.port}`)
            })
        }
    
}
~~~

- Tengo que crear una nueva instancia para que corra el servidor con el método listen 
- Lo hago en app.js que ha quedado vacío

~~~js
import dotenv from 'dotenv'
import { Server } from "./models/server.js";

dotenv.config()

const server = new Server()

server.listen()
~~~

- Creo la carpeta public con un html básico
- Creo un método middleware en el server
- La palabra use es la palabra clave para expresar que esto es un middleware

~~~js
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
~~~

- Ahora en el 8080 del navegador veo el html que tengo dentro de /public.
- La ruta que tenía antes en el get('/') ya no es válida, la cambio por ('/hello')
-----

# Peticiones HTTP GET-PUT-POST-DELETE


