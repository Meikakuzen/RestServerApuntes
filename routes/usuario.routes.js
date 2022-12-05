import {Router} from 'express'
import { check } from 'express-validator'
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from '../controllers/usuario.controller.js'
import { emailExiste, esRoleValido } from '../helpers/db-validators.js'
import {validarCampos} from '../middlewares/validar-campos.js'


export const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de ser de más de 6 letras').isLength({ min: 6}),
    check('correo', "El correo no es válido").isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom(esRoleValido),
    validarCampos
] ,usuariosPost)

router.delete('/', usuariosDelete)


