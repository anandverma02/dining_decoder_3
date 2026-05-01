require("dotenv").config();

const { createApp } = require("./app");
const { connectDb } = require("./config/db");
const { seedDefaultAdmin } = require("./utils/seedAdmin");

async function main() {
  const port = process.env.PORT || 5000;
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("Missing MONGO_URI");
  }

  try {
    await connectDb(mongoUri);
    await seedDefaultAdmin();

    const app = createApp();
    
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server ready on port ${port}`);
    });

  } catch (error) {
    console.error("Server failed:", error.message);
    process.exit(1);
  }
}


main().catch((err) => {
  console.error(err);
  process.exit(1);
});
