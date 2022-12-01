# Configuración MongoDB

- Instalo mongoose con npm
- Creo la carpeta config con el archivo db
- Esto es lo que va
- Importo mongoose, uso el método connect que devuelve una promesa y copio el string de conexión ( que puedo meterlo en una variable de entorno )

>MONGODB_CNN=mongodb://localhost:27017/NodeCafeRepaso

- Le añado los 2 parámetros
- Lo meto todo en un try y un catch
- Lo exporto por defecto

~~~js
import mongoose from 'mongoose'


const DBConnection= async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })

        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la DB')
    }
}
export default DBConnection
~~~

- Creo el método async conectarDb en el server
- Debo llamarlo en el constructor de mi clase Server para que la inicie al instanciar el servidor

~~~js

    
    constructor(){
        this.app = express()
        this.port= process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.conectarDB()
        this.middlewares()
        this.routes()
    }

    async conectarDB(){
        await DBConnection()
    }
~~~
----

# Modelo de Usuario

- Creo el archivo usuario.js en models
- Utilizo Schema de mongoose para definir el modelo
~~~js
import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    
})
~~~

- Empiezo a definir las propiedades
- Puedo definir en un arreglo que sea requerido y el mensaje en caso de error

~~~js
import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
})
~~~

- enum me va a validar si es uno u otro
- google es para saber si el usuario fue creado por google, por defecto en false

~~~js
import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN', 'USER']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

})
~~~

- Ahora debo exportar el modelo de usuario. Entre comillas le pongo el nombre de la colección en singular ( le añadirá la s ), y tras una coma el modelo

~~~js
const Usuario = mongoose.model("Usuario", UsuarioSchema)

export default Usuario
~~~
----
# Insertar usuario en la DB con POST

- Voy al método POST del controller
- Creo en postman o thunderclient el objeto de la petición POST al endpoint /api/usuarios

~~~js
{
  "nombre": "Jean",
  "correo": "jean@mail.com",
  "password": 123456,
  "rol": "ADMIN"
}
~~~

- Aunque tengo que valorar si viene información sensible (cómo el password) ahora la prioridad es insertar en la DB
- Importo Usuario en el controller para usar el modelo
- Le inserto la data del body

         NOTA: La "U" mayúscula de Usuario es un standard para poder crear instancias de Usuario con minúscula

~~~js
export const usuariosPost = (req,res)=>{

    const body = req.body
    const usuario = new Usuario(body)

    res.json({
        msg: 'Es una petición post API',
        usuario
    })
}
~~~

- Falta guardar la data en la DB
- Es un método async-await

~~~js
export const usuariosPost = async(req,res)=>{

    const body = req.body
    const usuario = new Usuario(body)

    await usuario.save()

    res.json({
        msg: 'Es una petición post API',
        usuario
    })
}
~~~

- Ahora se ha creado la DB NodeCafeRepaso con la colección usuarios  con el usuario Jean con un id único
- Si no hubieran todos los datos requeridos la app crasheará
- Si choca con el correo también crasheará
- Hay que manejar los errores
- El password no está encriptado y los roles todavía no los filtra

# BcryptJS- Encriptando la contraseña
