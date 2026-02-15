import app from "./app.js";
import { connectDB } from "./config/db.config.js";
import appConfig from "./config/app.config.js";

const startServer = async () => {
  await connectDB();

  app.listen(appConfig.port, () => {
    console.log(
      `🚀 Server running on port ${appConfig.port} in ${appConfig.nodeEnv} mode`,
    );
  });
};

startServer();
