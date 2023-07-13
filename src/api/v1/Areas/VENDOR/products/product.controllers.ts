import { Response, Request } from "express";
import { createProduct } from "./product.services";
import { createProductInput } from "./product.schemas";
import prisma from "../../../../../utils/prisma";

export async function createProductHandler(
  req: Request<object, object, createProductInput>,
  res: Response
) {
  try {
    const user = res.locals.user;
    const vendorId = await prisma.user.findUnique({
      where: { id: user.id },
      select: { vendor: true },
    });
    console.log(vendorId);
    if (!vendorId?.vendor?.id) {
      return res.send(403);
    }
    console.log(user);
    const body = req.body;
    const product = await createProduct(body, vendorId?.vendor?.id);
    console.log(product);
    return res.sendStatus(201);
  } catch (e: any) {
    if (e.code === "P2002") {
      console.log("product exist");
      return res.sendStatus(401);
    }
    console.log(e);
    return res.sendStatus(500);
  }
}
