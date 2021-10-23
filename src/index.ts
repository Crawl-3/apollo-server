import "./services/env";
import { Logger } from "./services/logger";
import { ApolloServer } from "apollo-server";
import { TypeDefinitions } from "./schemas/type-definitions";
import { Resolvers } from "./resolvers/resolvers";

Logger.info("Starting Apollo server");

const server = new ApolloServer({
    typeDefs: TypeDefinitions,
    resolvers: Resolvers,
    logger: Logger,
});

server.listen(7000).then(({ url }) => {
    Logger.info(`Server listening on ${url}`);
});