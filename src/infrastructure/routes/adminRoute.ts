import express from 'express'
import AdminController from '../../adapters/controllers/adminController'
import AdminRepository from '../repository/adminRepository'
import AdminUseCase from '../../useCase/adminUseCase'
import Jwt from '../utils/jwt'
import HashPassword from '../utils/hashPassword'

const jwt = new Jwt()
const hash = new HashPassword()
const repository = new AdminRepository()
const useCase = new AdminUseCase(repository, jwt, hash)
const controller = new AdminController(useCase)
const router = express.Router()

router.post('/login', (req,res)=>controller.login(req,res))

export default router