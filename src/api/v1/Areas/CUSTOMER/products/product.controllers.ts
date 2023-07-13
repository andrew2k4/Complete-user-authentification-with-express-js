import { Request, Response } from "express";
import { findManyProduct, findProductById } from "./product.services";
import { getOneProductInput } from "./product.schemas";

export async function getManyProductHandler(req: Request, res: Response) {
  try {
    const products = await findManyProduct();
    return res.send(products);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function getOneProductHandler(
  req: Request<getOneProductInput>,
  res: Response
) {
  try {
    const { id } = req.params;

    const product = await findProductById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    return res.send(product);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
