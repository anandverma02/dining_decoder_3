require("dotenv").config();

const { createApp } = require("./app");
const { connectDb } = require("./config/db");
const { seedDefaultAdmin } = require("./utils/seedAdmin");

async function main() {
  const port = Number(process.env.PORT || 5000);
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("Missing MONGO_URI in environment");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment");
  }

  await connectDb(mongoUri);
  await seedDefaultAdmin();

  const app = createApp();
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
