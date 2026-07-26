import { z } from "zod";

export const createShortUrlSchema = z.object({
    originalUrl: z.url()
});