import { redisClient } from "../config/redis";

export const cacheService = {
    async get(key: string) {
        return await redisClient.get(key);
    },

    async set(key: string, value: string, ttl = 3600) {
        await redisClient.set(key, value, {
            EX: ttl,
        });
    },

    async del(key: string) {
        await redisClient.del(key);
    },
};