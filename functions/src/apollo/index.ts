import { ApolloClient, InMemoryCache } from "@apollo/client";

require("dotenv").config();

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? process.env.PRISMA_ENDPOINT_DEV
      : process.env.PRISMA_ENDPOINT,
  cache: new InMemoryCache(),
});
