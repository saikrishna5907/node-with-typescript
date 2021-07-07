import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();


router.get('/shop', (req: Request, res: Response, next: NextFunction) => {
  console.log(req);

});

export default router;
