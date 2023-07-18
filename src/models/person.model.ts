import { sequelize } from '../database/config'
import { DataTypes, Model } from 'sequelize'

export class PersonModel extends Model {
  id!: number
  cedula!: string
  name!: string
  home!: string
  edad!: string
  age!: string
  email!: string
  cellphone!: string
  attendance!: boolean
  provincia?: string
  canton?: string
  parroquia?: string
  recinto?: string
  jrv?: string
  nivel?: string
}

PersonModel.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    cedula: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    cellphone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    training: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    provincia: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    canton: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    parroquia: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    recinto: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    jrv: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    nivel: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    tableName: 'Person',
    createdAt: true,
    updatedAt: true,
  }
)
