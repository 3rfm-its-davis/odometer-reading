import { generateAllCrud } from "./generated/autocrud";
import { builder } from "./builder";

builder.queryType({});
builder.mutationType({});
generateAllCrud();

export const schema = builder.toSchema({});
