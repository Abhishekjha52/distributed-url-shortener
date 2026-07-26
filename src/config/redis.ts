import { createClient } from "redis";
import { env } from "./env";

export const redisClient = createClient({
    socket: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
    },
});

export const connectRedis = async () => {
    try {
        await redisClient.connect();

        console.log("✅ Redis Connected");
    } catch (error) {
        console.error("❌ Redis Connection Failed", error);

        process.exit(1);
    }
};