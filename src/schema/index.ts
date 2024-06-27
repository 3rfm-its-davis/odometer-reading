import { generateAllCrud } from "./generated/autocrud";
import { builder } from "./builder";

generateAllCrud();
builder.queryType({
  description: "Root query type",
  fields: (t) => ({
    helloWorld: t.field({
      type: "String",
      resolve: () => "Hello, World!",
    }),
  }),
});
builder.mutationType({
  description: "Root mutation type",
  fields: (t) => ({
    helloWorld: t.field({
      type: "String",
      resolve: () => "Hello, World!",
    }),
  }),
});

export const schema = builder.toSchema({});
