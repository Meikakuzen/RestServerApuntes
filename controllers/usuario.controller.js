import Usuario from "../models/usuario.js";

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

    const body = req.body
    const usuario = new Usuario(body)

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