import {
  generateAllCrud,
  generateAllMutations,
  generateAllObjects,
  generateAllQueries,
} from "./generated/autocrud";
import { builder } from "./builder";

// generateAllCrud();
generateAllQueries();
generateAllMutations();
generateAllObjects();
builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});
