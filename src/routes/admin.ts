import express from 'express';
import { Request, Response, NextFunction } from 'express';
import Product from '../products/product';
const router = express.Router();


router.post('/product', (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);

  Product.create({
    title: req.body.title,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  }).then(result => {
    res.send(result);

  }).catch(err => {
    console.error(err);

  })
});


router.get('/product', (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);

  res.redirect('/')
})

export default router;