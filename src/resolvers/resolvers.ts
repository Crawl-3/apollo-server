import { User, users } from "../users.fake-db";
import { Logger } from "../services/logger";

export const Resolvers = {
    Query: {
        users(): User[] {
            return users;
        },
        user(_: string, args: User): User | undefined {
            return users.find(user => user.id === args.id);
        },
    },
    Mutation: {
        addUser(_: never, args: ArgsUser): User | undefined {
            const id: string = (users.length + 1).toString();
            Logger.info("User adding with input: ", args.user.details);

            users.push({
                id,
                details: args.user.details,
            });
            return users.find(user => user.id === id);
        },
    },
};

export interface ArgsUser {
    user: User;
}