module.exports = {
  inputs: {
    outputFilePath: "./prisma/schema/generated/inputs.ts",
    prismaImporter: 'import { Prisma } from "@prisma/client";',
  },
  crud: {
    outputDir: "./prisma/schema/generated/",
    inputsImporter: 'import * as Inputs from "../inputs";\n',
    prismaImporter: 'import { Prisma } from "@prisma/client";',
    resolverImports:
      'import { prisma } from "../../../../../prisma/schema/builder";',
    prismaCaller: "prisma",
  },
  global: {
    builderLocation: "prisma/schema/builder",
  },
};
