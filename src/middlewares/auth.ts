import { NextFunction, Request, Response } from 'express';

export async function auth(req: Request, res: Response, next: NextFunction) {
    const serverToken = process.env.SERVER_TOKEN;
    const requestToken = req.headers?.authorization;

    if (serverToken !== requestToken) {
        res.status(401).end();
    } else {
        next();
    }
}