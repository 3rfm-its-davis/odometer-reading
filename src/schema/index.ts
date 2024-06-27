import { generateAllCrud } from "./generated/autocrud";
import { builder } from "./builder";

generateAllCrud();
builder.queryType({ description: "Root query type" });
builder.mutationType({ description: "Root mutation type" });

export const schema = builder.toSchema({});
