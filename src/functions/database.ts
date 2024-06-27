import { ApolloServer } from "@apollo/server";
import { v4 } from "@as-integrations/azure-functions";
import { schema } from "../schema";
import { app } from "@azure/functions";

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.http("graphql", {
  handler: v4.startServerAndCreateHandler(server),
});
