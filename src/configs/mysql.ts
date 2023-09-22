import { Sequelize } from "sequelize-typescript";
import Finance from "../models/Finance";
import User from "../models/User";

// eslint-disable-next-line
const dbConfig = require("./database");
// import dbConfig from "../config/database";

const sequelize = new Sequelize(dbConfig);

const models = [
    Finance,
    User
];

sequelize.addModels(models);

export default sequelize;
