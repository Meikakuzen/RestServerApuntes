

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

export const usuariosPost = (req,res)=>{

    const {nombre, edad}= req.body

    res.json({
        msg: 'Es una petición post API',
        nombre,
        edad
    })
}

export const usuariosDelete = (req,res)=>{
    res.json({
        msg: 'Es una petición delete API'
    })
}