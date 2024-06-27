import SchemaBuilder from "@pothos/core";
import { PrismaClient } from "@prisma/client";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";

export const prisma = new PrismaClient();
export const builder = new SchemaBuilder<{
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
    Bytes: {
      Input: Buffer;
      Output: Buffer;
    };
  };
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});
