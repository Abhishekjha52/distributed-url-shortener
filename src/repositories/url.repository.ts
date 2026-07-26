import { Url } from "../models/url.model";

export interface CreateUrlData {
    originalUrl: string;
    shortCode: string;
}

export const urlRepository = {
    async create(data: CreateUrlData) {
        return await Url.create(data);
    },

    async findByShortCodeAndIncrementClicks(shortCode: string) {
        return Url.findOneAndUpdate(
            { shortCode },
            { $inc: { clicks: 1 } },
            { returnDocument: "after", }
        );
    },

    findByShortCode(shortCode: string) {
        return Url.findOne({ shortCode });
    },

    async incrementClicks(shortCode: string) {
        return Url.updateOne(
            { shortCode },
            {
                $inc: {
                    clicks: 1,
                },
            }
        );
    },
};