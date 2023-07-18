import { Request, Response } from 'express'
import { sendMail } from '../nodemailer/mail'
import request from 'request'

import { PersonModel } from '../models/person.model'
// import usuario from '../models/usuario';
import { generarJWT } from '../jwt/jwt'

const getPersons = async (req: Request, res: Response) => {
  const users = await PersonModel.findAll()
  res.status(200).json({
    ok: true,
    data: users,
  })
}
const getAssistants = async (req: Request, res: Response) => {
  const users = await PersonModel.findAll({ where: { training: true } })
  res.status(200).json({
    ok: true,
    data: users,
  })
}
const getPerson = async (req: Request, res: Response) => {
  const { cedula } = req.body
  const existeCedula = await PersonModel.findOne({ where: { cedula: cedula } })
  if (existeCedula) {
    console.log('Estamos dentro del la validaiconde cedula')
    return res.status(500).json({
      ok: false,
      error: 'La persona ya ha sido registrada',
    })
  } else {
    res.json({
      ok: true,
      //data: usuario,
      // token
    })
  }
}

function parseDate(date: String) {
  let dateParts = date.split('/')
  return new Date(+dateParts[2], parseInt(dateParts[1]) - 1, +dateParts[0])
}

function calcularEdad(fecha: String) {
  var hoy = new Date()
  var cumpleanos = parseDate(fecha)
  var edad = hoy.getFullYear() - cumpleanos.getFullYear()
  var m = hoy.getMonth() - cumpleanos.getMonth()

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--
  }
  return edad
}

// const createPerson = async (req: Request, res: Response) => {
//   const { cedula, name, email, home, age, institution, position, cellphone } =
//     req.body

//   try {
//     console.log('Debug3')
//     const existePerson = await PersonModel.findOne({
//       where: { cedula: cedula },
//     })

//     console.log(existePerson)

//     if (existePerson) {
//       console.log('Actualizo datos')
//       return res.status(500).json({
//         ok: false,
//         error: 'La persona ya ha sido registrada con anterioridad',
//         user: existePerson,
//       })
//     }

//     const person = new PersonModel({
//       name: name,
//       cedula: cedula,
//       home: home,
//       cellphone: cellphone,
//       age: age,
//       email: email,
//       institution: institution,
//       position: position,
//     })
//     const personNew = await person.save()
//     sendMail(email, name)
//     res.json({
//       ok: true,
//       data: personNew,
//       // token
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({
//       ok: false,
//       error: error,
//     })
//   }
// }
// const getPreinscripcion = async (req: Request, res: Response) => {
//   const { cedula } = req.body
//   const person = await PersonModel.findOne({ where: { cedula: cedula } })
//   if (person) {
//     return res.status(200).json({
//       ok: true,
//       data: person,
//     })
//   } else {
//     request(
//       'https://apiservices.manabi.gob.ec/persona/registrocivil/datosdemograficos/' +
//         cedula,
//       async (err, response, body) => {
//         const person = JSON.parse(body)
//         if (err) {
//           console.log(err + 'Error al consultar datos de la persona')
//           return res.status(500).json({
//             ok: false,
//             error: 'No se pudo consultar los datos',
//           })
//         }
//         if (person.nombre == null) {
//           return res.status(500).json({
//             ok: false,
//             error: 'El numero de cedula esta incorrecto o la persona no existe',
//           })
//         }
//         const usuario = new PersonModel({
//           id: 1,
//           cedula: cedula,
//           name: person.nombre,
//           email: person.email,
//           home: person.domicilio,
//           age: calcularEdad(person.fechaNacimiento),
//           institution: person.institucion,
//           position: person.position,
//         })

//         res.json({
//           ok: true,
//           data: usuario,
//           // token
//         })
//       }
//     )
//   }
// }
const updatePerson = async (req: Request, res: Response) => {
  const {
    cedula,
    name,
    email,
    cellphone,
    training,
    provincia,
    canton,
    parroquia,
    recinto,
    jrv,
    nivel,
  } = req.body

  try {
    const person = await PersonModel.findOne({
      where: { cedula: cedula },
    })

    if (person) {
      person.training = true
      person.save()
      console.log('Actualizo datos')
      return res.status(200).json({
        ok: true,
        data: person,
      })
    }
    const newPerson = new PersonModel({
      cedula: cedula,
      name: name,
      email: email,
      cellphone: cellphone,
      training: true,
      provincia: provincia,
      canton: canton,
      parroquia: parroquia,
      recinto: recinto,
      jrv: jrv,
      nivel: nivel,
    })
    const personNew = await newPerson.save()
    sendMail(email, name)
    res.json({
      ok: true,
      data: personNew,
      // token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      error: error,
    })
  }
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    // const usuarioDB = await User.findOne({ email });
    // if (!usuarioDB) {
    //     return res.status(500).json({
    //         ok: false,
    //         error: 'User not Found'
    //     });
    // }
    // Validar el password
    // const validatePassword = compareSync(password, usuarioDB.password);
    // if (!validatePassword) {
    //     return res.status(500).json({
    //         ok: false,
    //         error: 'User or Password Incorrect'
    //     });
    // }
    // Generar el JWT
    // const token = await generarJWT(usuarioDB.id);
    // res.json({
    //     ok: true,
    //     usuario: usuarioDB,
    //     token
    // });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      error: 'Contact with administrator',
    })
  }
}

export { getAssistants, getPersons, updatePerson }
