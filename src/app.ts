import express from "express";
import { prisma } from "./data/postgres";

(async () => {
  await main();
})();

async function main() {
  const app = express();

  app.use(express.json());

  app.get("/", async (_req, res) => {
    const tasks = await prisma.task.findMany();

    res.json({
      message: "[DB] coonnect exitos !!!",
      tasks,
    });
  });

  app.listen(process.env.PORT, () => {
    console.log("[api] listen port 3000");
  });
}
