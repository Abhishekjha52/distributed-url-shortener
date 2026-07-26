import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/database";
import { connectRedis } from "./config/redis";
async function startServer() {
    await connectDB();
    await connectRedis();
    app.listen(env.PORT, () => {
        console.log(`🚀 Server running on port ${env.PORT}`);
    });
}

startServer();