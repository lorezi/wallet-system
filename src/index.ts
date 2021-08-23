require("dotenv").config();
import { createServer } from "http";
import app from "./app";
import { sequelize } from "./sequelize";

const port = process.env.PORT || 3000;

// To handle synchronous exception ==> graceful shutdown of server
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! 😋 Shutting down...");
  process.exit(1);
});

(async () => {
  await sequelize.sync({ logging: false });
  const server = createServer(app).listen(port, () =>
    console.info(`Server running on port ${port}`)
  );

  // To handle async exception ===> graceful shutdown of server
  process.on("unhandledRejection", (err: any) => {
    console.log(err.name, err.message);
    console.log("UNHANDLED REJECTION! 😋 Shutting down..");
    server.close(() => {
      process.exit(1);
    });
  });
})();
