import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { IProduct } from '../models/product/Iproduct.interface';
import { Product } from '../models/product/product';
const router = express.Router();


router.post('/product', async (req: Request, res: Response, next: NextFunction) => {

  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
  } as IProduct)

  try {
    await
      res.send('product added successfully...!')
  } catch (err) {
    console.error(err);
  }
});


// router.get('/products', (req: Request, res: Response, next: NextFunction) => {
//   Product.findAll().then((result: any) => {
//     res.send(result);
//   })
//     .catch((err: Error) => {
//       console.error(err);
//     });
// });
// router.get('/products/:id', (req: Request, res: Response, next: NextFunction) => {
//   Product.findById(req.params.id).then((result: any) => {
//     res.status(200).send(result)
//   }).catch((err: Error) => {
//     res.status(500).send(err)
//   })
// })

// router.put('/products/:id', (req: Request, res: Response, next: NextFunction) => {
//   Product.updateOne(req.body).then((result: any) => {
//     res.status(200).send(result)
//   }).catch((err: Error) => {
//     res.status(500).send(err)
//   })
// })

export default router;