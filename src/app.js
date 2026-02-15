import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import appRoutes from "./routes/index.routes.js";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan("dev"));

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Gidy Profile API running 🚀",
  });
});
app.use("/", appRoutes);
// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
