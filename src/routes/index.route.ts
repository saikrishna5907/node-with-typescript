import { Router } from "express";
import productRouter from "./product/product.routes";

const indexRouter = Router()

indexRouter.use("/product", productRouter)

export default indexRouter;