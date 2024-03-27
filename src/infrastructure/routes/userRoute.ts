import express from 'express'
import UserController from '../../adapters/controllers/userController'
import UserRepository from '../repository/userRepository'
import UserUseCase from '../../useCase/userUseCase'
import Jwt from '../utils/jwt'
import BcryptPassword from '../utils/bcryptPassword'
import GenerateOTP from '../utils/generateOtp'
import SendMail from '../utils/sendMail'

const jwt = new Jwt()
const bcrypt = new BcryptPassword()
const otp = new GenerateOTP()
const sendMail = new SendMail()
const repository = new UserRepository()

const useCase = new UserUseCase(repository, otp, sendMail, jwt, bcrypt)
const controller = new UserController(useCase)
const router = express.Router()

router.post('/signup', (req, res) => controller.signupAndSendOtp(req, res))
router.post('/verifyOTP', (req, res) => controller.verifyOtpAndSaveUser(req, res))
router.post('/login', (req, res) => controller.login(req, res))

export default router