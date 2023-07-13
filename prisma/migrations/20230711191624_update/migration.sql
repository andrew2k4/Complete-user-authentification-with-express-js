-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'VENDOR');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('NEWWITHTAG', 'NEWWITHOUTTAG', 'VERYGOODSTATE', 'GOODSTATE', 'SATISFYING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "verificationCode" UUID NOT NULL,
    "passwordResetCode" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "phoneNumber" INTEGER,
    "profileImage" TEXT,
    "bio" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "cniImage" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "profileImage" TEXT,
    "bio" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userAgent" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "coverImage" TEXT NOT NULL,
    "productItemId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "coverImage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "keyWords" TEXT[],
    "state" "State" NOT NULL,
    "brandId" INTEGER NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "ProductItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Variation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariationOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "variationId" INTEGER NOT NULL,

    CONSTRAINT "VariationOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mater" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToProductItem" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ColorToProductItem" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MaterToProductItem" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phoneNumber_key" ON "Customer"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_phoneNumber_key" ON "Vendor"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_userId_key" ON "Vendor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productItemId_key" ON "Product"("productItemId");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Color_name_key" ON "Color"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Mater_name_key" ON "Mater"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProductItem_AB_unique" ON "_CategoryToProductItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProductItem_B_index" ON "_CategoryToProductItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ColorToProductItem_AB_unique" ON "_ColorToProductItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ColorToProductItem_B_index" ON "_ColorToProductItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MaterToProductItem_AB_unique" ON "_MaterToProductItem"("A", "B");

-- CreateIndex
CREATE INDEX "_MaterToProductItem_B_index" ON "_MaterToProductItem"("B");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variation" ADD CONSTRAINT "Variation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationOption" ADD CONSTRAINT "VariationOption_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "Variation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProductItem" ADD CONSTRAINT "_CategoryToProductItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProductItem" ADD CONSTRAINT "_CategoryToProductItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColorToProductItem" ADD CONSTRAINT "_ColorToProductItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColorToProductItem" ADD CONSTRAINT "_ColorToProductItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterToProductItem" ADD CONSTRAINT "_MaterToProductItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Mater"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterToProductItem" ADD CONSTRAINT "_MaterToProductItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
