import express from "express";
import cors from "cors";
import { logger } from "./middleware/logger.middleware";
import urlRouter from "./routes/url.routes";
import redirectRouter from "./routes/redirect.routes";
import { errorHandler } from "./middleware/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
const app = express();
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
app.use("/api/v1/urls", urlRouter);
app.use("/", redirectRouter);
app.get("/", (req, res) => {
    res.send("Welcome to Distributed URL Shortener 🚀");
});
app.use(errorHandler);

export default app;