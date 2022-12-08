import  Role  from "../models/rol.js"
import Usuario from '../models/usuario.js'

export const esRoleValido= async(rol ="") =>{
    
    const existeRol = await Role.findOne({rol})

    
        if(!existeRol){
            throw new Error(`El rol ${rol} no existe en la DB`)
        }
 
}

export const emailExiste = async(correo="")=>{
    const existeEmail= await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error (`El correo ${correo} ya está registrado`)
    }
}

export const existeUsuarioPorId = async(id)=>{
    const existeUsuario = await Usuario.findById(id)
    
    if(!existeUsuario){
        throw new Error(`El usuario no existe`)
    }
}