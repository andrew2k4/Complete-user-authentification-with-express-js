import prisma from "../../../../../utils/prisma";

export async function findProductById(id: string) {
  return prisma.productItem.findUnique({
    where: { id: id },
    include: {
      vendor: {
        select: {
          userId: true,
        },
      },
    },
  });
}

export async function findManyProduct() {
  return prisma.product.findMany({
    take: 10,
  });
}
