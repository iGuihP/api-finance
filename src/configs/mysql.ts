import { Sequelize } from "sequelize-typescript";
import PaymentTransaction from "../models/PaymentTransaction";
import User from "../models/User";

// eslint-disable-next-line
const dbConfig = require("./database");
// import dbConfig from "../config/database";

const sequelize = new Sequelize(dbConfig);

const models = [
    PaymentTransaction,
    User
];

sequelize.addModels(models);

export default sequelize;
