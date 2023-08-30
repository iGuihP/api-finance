import { Sequelize } from "sequelize-typescript";
import Finance from "../models/Finance";

// eslint-disable-next-line
const dbConfig = require("./database");
// import dbConfig from "../config/database";

const sequelize = new Sequelize(dbConfig);

const models = [
    Finance
];

sequelize.addModels(models);

export default sequelize;
