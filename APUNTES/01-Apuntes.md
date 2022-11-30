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

- Ahora en el 8080 del navegador veo el html que tengo dentro de /public en la ruta raíz '/'
- La ruta que tenía antes en el get('/') ya no es válida, la cambio por ('/hello')
-----

# Peticiones HTTP GET-PUT-POST-DELETE

- Puedo devolver un json con .json

~~~js

        routes(){
            this.app.get('/api', (req,res)=>{
                res.json({
                    msg: 'Es una petición get API'
                })
            })
        }
~~~

- Puedo cambiarle el status con .status (el ok sería un 200)

~~~js
        routes(){
            this.app.get('/api', (req,res)=>{
                res.status(403).json({
                    msg: 'Es una petición get API'
                })
            })
        }
~~~

- Copio tres veces la petición get y lo cambio a put, post y delete

~~~js
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
~~~

    - Uso thunderclient o postman para realizar las peticiones
   
----
# Usando códigos de respuesta HTTP en Express

- 200 es todo OK
    - 201 Created (con POST)
- 300 es redireccionamiento
- 400 ERROR Client (algo hizo mal en el frontend)
    - 400 Bad Request
    - 401 Unauthorized
    - 402 Payment Required
    - 403 Forbidden
    - 404 Not Found
    - 408 Request Time Out
- 500 Server Error (algo salió mal en el server)
    - 500 Internal Server Error
    - 502 Bad Gateway
----

# CORS - Middleware

- Instalo cors con npm. No tendría sentido si solo fuera en una red interna y las peticiones surgieran de un mismo lugar. 

> npm i cors

- Permite proteger el servidor de manera superficial
- Tiene que estar habilitado para la mayoría de navegadores
- Se puede configurar una whitelist y una blacklist


- Lo importo en el server

> import cors from 'cors'

- Lo uso en el método de middlewares antes del resto

~~~js
middlewares(){
            this.app.use(cors())
            this.app.use(express.static('public'))
        }
~~~

# Separar las rutas y el controlador de la clase






