import { Request, Response } from "express";
import mongoose from "mongoose";
import { redisClient } from "../config/redis";

export const healthCheckController = async (
    req: Request,
    res: Response
) => {
    const mongoStatus =
        mongoose.connection.readyState === 1
            ? "Connected"
            : "Disconnected";

    const redisStatus =
        redisClient.isReady
            ? "Connected"
            : "Disconnected";

    return res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        services: {
            mongodb: mongoStatus,
            redis: redisStatus,
        },
    });
};