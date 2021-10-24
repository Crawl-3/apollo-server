import "./services/env";
import { ApolloServer } from "apollo-server";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { TypeDefinitions } from "./schemas/type-definitions";
import { Resolvers } from "./resolvers/resolvers";
import { init as dbInit } from "./services/db-handler";
import { Logger } from "./services/logger";

async function run() {
    Logger.info("Starting database handler");
    await dbInit();

    // TODO: add auth
    Logger.info("Starting server");
    const server = new ApolloServer({
        typeDefs: TypeDefinitions,
        resolvers: Resolvers,
        logger: Logger,
        plugins: [
            process.env.NODE_ENV === "production"
                ? ApolloServerPluginLandingPageProductionDefault({
                      footer: false,
                  })
                : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
        ],
    });

    server.listen(7000).then(({ url }) => {
        Logger.info(`Server listening on ${url}`);
    });
}

run().catch((err) => Logger.error("Unexpected error:", err));
