import Usuario from "../models/usuario.js";
import bcryptjs from 'bcryptjs';


export const usuariosGet= (req,res)=>{

    const {q,nombre ="Pere", id = 0}= req.query

    res.json({
        msg: 'Es una petición get API',
        q,
        nombre,
        id
    
    })
}

export const usuariosPut = (req,res)=>{

    const id= req.params.id

    res.json({
        msg: 'Es una petición put API',
        id
    })
}

export const usuariosPost = async(req,res)=>{

  

    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol})

   

    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()

    res.json({
        msg: 'Es una petición post API',
        usuario
    })
}

export const usuariosDelete = (req,res)=>{
    res.json({
        msg: 'Es una petición delete API'
    })
}