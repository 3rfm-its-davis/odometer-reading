import { ApolloServer } from "@apollo/server";
import { v4 } from "@as-integrations/azure-functions";
import { schema } from "../schema";
import { app } from "@azure/functions";

const server = new ApolloServer({
  schema,
});

app.http("graphql", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: v4.startServerAndCreateHandler(server),
});
