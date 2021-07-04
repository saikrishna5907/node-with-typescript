import Sequelize from "sequelize";

import sequelize from '../utilities/database';

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

interface UserModel {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export { UserModel };
export default User;

