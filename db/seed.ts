import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import sampleData from "./sample-data";

const seed = async () => {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });

  const prisma = new PrismaClient({ adapter });

  try {
    // delete all data
    await prisma.product.deleteMany();
    // add products
    await prisma.product.createMany({ data: sampleData.products });
    console.log("data base seeded successfully <3");
  } catch (error) {
    console.log(error);
    console.log("seeding failed");
  }
};

seed();
