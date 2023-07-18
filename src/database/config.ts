import { Sequelize } from 'sequelize'
import { PersonModel } from '../models/person.model.js'
const password = 'C0ntr0l$T3cn0l0g1c0'
const username = 'control_manabi_2023'
const database = 'c_electoral'
// const password = 'root'
// const username = 'postgres'
// const database = 'expo_tecnologia'

const sequelize = new Sequelize(database, username, password, {
  host: process.env.POSTGRESQL_DB_URI || 'localhost',
  dialect: 'postgres',
})
//const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI);

const dbConnection = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
export { sequelize, dbConnection }
