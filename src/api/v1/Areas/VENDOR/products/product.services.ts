import prisma from "../../../../../utils/prisma";
import { createProductInput } from "./product.schemas";

export async function createProduct(
  input: createProductInput,
  vendorId: string
) {
  console.log(vendorId);
  return prisma.productItem.create({
    data: {
      name: input.name,
      price: input.price,
      coverImage: input.coverImage,
      description: input.description,
      images: ["a"],
      keyWords: ["a"],
      state: "GOODSTATE",
      color: {
        connectOrCreate: {
          where: {
            name: input.color,
          },
          create: {
            name: input.color,
          },
        },
      },
      matter: {
        connectOrCreate: {
          where: {
            name: input.matter,
          },
          create: {
            name: input.matter,
          },
        },
      },
      brand: {
        connectOrCreate: {
          where: {
            name: input.brand,
          },
          create: {
            name: input.brand,
          },
        },
      },
      vendor: {
        connect: {
          id: vendorId,
        },
      },
      categoryId: {
        connectOrCreate: {
          where: {
            name: "andrew",
          },
          create: {
            name: "andrew",
          },
        },
      },
      product: {
        create: {
          name: input.name,
          price: input.price,
          coverImage: input.coverImage,
        },
      },
    },
  });
}
