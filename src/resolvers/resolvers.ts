import { Logger } from "../services/logger";
import { UserDetails, UserDocument, UserModel } from "../services/db-handler";
import { v4 as uuid } from "uuid";

export const Resolvers = {
    Query: {
        async users(): Promise<UserDocument[]> {
            return await UserModel.find({});
        },
        async user(_: string, args: UserDocument): Promise<UserDocument | null> {
            return await UserModel.findById(args._id);
        },
    },
    Mutation: {
        async addUser(_: never, args: AddUserInput): Promise<UserDocument> {
            Logger.info("Attempting to add user with input:", args);

            const newUser = new UserModel({
                _id: uuid(),
                email: args.email,
                password: args.password,
                details: args.details,
            });

            await newUser.save();
            return newUser;
        },
        async deleteUser(_: never, args: DeleteUserInput): Promise<boolean> {
            Logger.info("Attempting to delete user with input:", args);

            try {
                const user = await UserModel.findById(args._id);

                if (!user) {
                    Logger.warn("User not found with input:", args);
                    return false;
                }

                await user?.remove();
                Logger.info("User deleted with input: ", args);
                return true;
            } catch (err) {
                Logger.error("Failed to delete user: ", err);
                return false;
            }
        },
    },
};

export interface AddUserInput {
    email: string;
    password: string;
    details: UserDetails;
}
export interface DeleteUserInput {
    _id: string;
}
