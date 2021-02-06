import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { context } from "./context";

export const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
});
