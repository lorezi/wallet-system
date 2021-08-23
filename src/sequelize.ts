import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  models: [__dirname + "/models"],
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
