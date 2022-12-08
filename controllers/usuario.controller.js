import Usuario from "../models/usuario.js";
import bcryptjs from 'bcryptjs';


export const usuariosGet= async(req,res)=>{

    const {limite = 5, desde = 0} = req.query

    const query= {estado:true}
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

export const usuariosPut = async (req,res)=>{

    const id= req.params.id
    const {_id, password, google, correo, ...resto} = req.body

    if(password){
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true})

    res.json({
        msg: 'Es una petición put API',
        usuario
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

export const usuariosDelete = async (req,res)=>{
    
    const {id} = req.params
    
   const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    
    res.json({
        usuario
    })
}