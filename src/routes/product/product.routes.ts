import { Router } from "express";
import { ProductController } from "../../api/product/product.controller";
import { ProductRepository } from "../../Repositories/Product.repository";
import { ProductService } from "../../services/Product/product.service";

const productRouter = Router()
const productRepo = new ProductRepository();
const productService = new ProductService(productRepo);
const productController = new ProductController(productService)

// userRouter.get("/", [], productController.)
productRouter.post("/", productController.save);
// userRouter.get("/:id", productController.getById)
// userRouter.delete("/:id", productController.delete)

export default productRouter;