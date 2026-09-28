import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: "prisma/migrations",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});