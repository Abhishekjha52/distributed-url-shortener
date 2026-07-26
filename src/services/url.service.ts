import { urlRepository } from "../repositories/url.repository";
import { generateShortCode } from "../utils/generateShortCode";
import { ApiError } from "../errors/api.error";
import { cacheService } from "./cache.service";

export const createShortUrl = async (originalUrl: string) => {
    const MAX_RETRIES = 5;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        const shortCode = generateShortCode();

        try {
            return await urlRepository.create({
                originalUrl,
                shortCode,
            });
        } catch (error: any) {
            // Duplicate shortCode
            if (error.code === 11000) {
                continue;
            }

            throw error;
        }
    }

    throw new ApiError(
        "Unable to generate unique short code.",
        500
    );
};

export const getOriginalUrl = async (shortCode: string) => {
    // Check Redis first
    const cachedOriginalUrl = await cacheService.get(shortCode);

    if (cachedOriginalUrl) {
        console.log("🟢 Cache Hit");

        // Update click count in MongoDB
        await urlRepository.incrementClicks(shortCode);

        return {
            originalUrl: cachedOriginalUrl,
        };
    }

    console.log("❌ Cache Miss");

    const url = await urlRepository.findByShortCodeAndIncrementClicks(shortCode);

    if (!url) {
        throw new ApiError("Short URL not found", 404);
    }

    // Store in Redis for 1 hour
    await cacheService.set(
        shortCode,
        url.originalUrl
    );

    return {
        originalUrl: url.originalUrl,
    };
};

export const getUrlDetails = async (shortCode: string) => {
    const url = await urlRepository.findByShortCode(shortCode);

    if (!url) {
        throw new ApiError("Short URL not found", 404);
    }

    return url;
};