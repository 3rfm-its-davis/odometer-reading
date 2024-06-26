import { ApolloClient, InMemoryCache } from "@apollo/client";

require("dotenv").config();

const PRISMA_ENDPOINT = process.env.PRISMA_ENDPOINT;

export const client = new ApolloClient({
  uri: PRISMA_ENDPOINT,
  cache: new InMemoryCache(),
});
