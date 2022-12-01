import {Router} from 'express'
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from '../controllers/user.controller.js'

export const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)


