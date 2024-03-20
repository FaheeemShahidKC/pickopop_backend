import express from 'express'
import AdminController from '../../adapters/controllers/adminController'
import AdminRepository from '../repository/adminRepository'
import AdminUseCase from '../../useCase/adminUseCase'
import Jwt from '../utils/jwt'
import BcryptPassword from '../utils/bcryptPassword'

const jwt = new Jwt()
const bcrypt = new BcryptPassword()
const repository = new AdminRepository()
const useCase = new AdminUseCase(repository, jwt, bcrypt)
const controller = new AdminController(useCase)
const router = express.Router()

router.post('/login', (req,res)=>controller.login(req,res))

export default router