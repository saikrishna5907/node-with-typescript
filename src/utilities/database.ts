import { Sequelize } from "sequelize";

const sequelize = new Sequelize('node', 'sai', 'Nextit2018!', { dialect: 'mysql', host: 'localhost' });

export default sequelize;

