import express from "express";
import { DataBase } from "./data/data-source";
import { config } from "dotenv";

config();

(async () => {
  await main();
})();

async function main() {
  const app = express();

  app.use(express.json());

  try {
    await DataBase.connect({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  } catch (error) {
    console.log(error);
  }

  app.get("/", async (_req, res) => {
    res.json({
      message: "[DB] coonnect exitos !!!",
    });
  });

  app.listen(process.env.PORT, () => {
    console.log("[api] listen port 3000");
  });
}
