import { Request, Response } from "express";
import { createShortUrl, getOriginalUrl, getUrlDetails } from "../services/url.service";

export const createShortUrlController = async (
    req: Request,
    res: Response
) => {

    const { originalUrl } = req.body;

    const result = await createShortUrl(originalUrl);

    return res.status(201).json(result);
};

export const redirectToOriginalUrl = async (
    req: Request<{ shortCode: string }>,
    res: Response
) => {
    const { shortCode } = req.params;

    const url = await getOriginalUrl(shortCode);

    res.redirect(url.originalUrl);
};

export const getUrlDetailsController = async (
    req: Request,
    res: Response
) => {
    const { shortCode } = req.params;

    const url = await getUrlDetails(shortCode as string);

    return res.status(200).json(url);
};