import { Router } from 'express'
import { check } from 'express-validator'
import {
  getPersons,
  updatePerson,
  getAssistants,
  getPerson,
} from '../controllers/auth_controller'
import { validateFields } from '../middleware/validator'

const router = Router()
router.post(
  '/updatePerson',
  [check('cedula', 'Cedula is required').not().isEmpty(), validateFields],
  updatePerson
)
router.post(
  '/getPerson',
  [check('cedula', 'Cedula is required').not().isEmpty(), validateFields],
  getPerson
)
// router.post(
//   '/getPreinscripcion',
//   [check('cedula', 'Cedula is required').not().isEmpty(), validateFields],
//   getPreinscripcion
// )
router.get('/getPersons', getPersons)
router.get('/getAssistants', getAssistants)

// router.post(
//   '/createPerson',
//   [
//     check('cedula', 'Cedula is required').not().isEmpty(),
//     check('name', 'Name is required').not().isEmpty(),
//     check('email', 'Email is required').isEmail(),
//     validateFields,
//   ],
//   createPerson
// )

// router.post('/login', [
//     check('password', 'Password is empty').not().isEmpty(),
//     check('email', 'Email is not validate').isEmail(),
// ], login);

// router.get('/renew', validateJWT, renewToken);

export { router }
