import { RequestHandler } from 'express';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		interface Request {
			random?: {
				randomResult: number;
			};
		}
	}
}

export const randomAccessMiddleware: RequestHandler = (req, res, next) => {
	const randomResult = Math.ceil(Math.random() * 20);
	if (randomResult < 5) {
		return res
			.status(400)
			.json({ result: randomResult, message: 'You rolled too low to access this resource.' });
	}
	req.random = { randomResult };
	next();
};
