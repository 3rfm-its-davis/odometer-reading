module.exports = {
  inputs: {
    outputFilePath: "./src/schema/generated/inputs.ts",
    prismaImporter: 'import { Prisma } from "@prisma/client";',
  },
  crud: {
    outputDir: "./src/schema/generated/",
    inputsImporter: 'import * as Inputs from "../inputs";\n',
    prismaImporter: 'import { Prisma } from "@prisma/client";',
    resolverImports:
      'import { prisma } from "../../../../../src/schema/builder";',
    prismaCaller: "prisma",
  },
  global: {
    builderLocation: "src/schema/builder",
  },
};
