import { Request, Response, NextFunction } from "express";

export const logger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    // console.log("-----------");

    // console.log(req.method);

    // console.log(req.url);

    // console.log(new Date().toISOString());

    // console.log("-----------");

    console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
    );

    next();
};