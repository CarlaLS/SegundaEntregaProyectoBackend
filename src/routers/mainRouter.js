
import { Router } from 'express'
import auth from '../Middlewares/auth'

const router = new Router()


router.get('/login', auth.login)

router.get('/logout', auth.logout)


export default router