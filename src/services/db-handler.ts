import { connect, model, Schema } from "mongoose";
import { Logger } from "./logger";

export interface UserDocument extends Document {
    _id: string;
    email: string;
    password: string;
    details: UserDetails;
}

export interface UserDetails {
    name: string;
}

const UserSchema = new Schema<UserDocument>({
    _id: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    details: {
        name: { type: String, required: true },
    },
});

export const UserModel = model<UserDocument>("user", UserSchema);

export async function init(): Promise<void> {
    const dbUri =
        process.env.NODE_ENV === "production"
            ? process.env.DATABASE_PROD_URI
            : process.env.DATABASE_DEV_URI;

    await connect(dbUri ?? "", {
        connectTimeoutMS: 15000,
    })
        .then(() => {
            Logger.info("Connected to database");
        })
        .catch((err) => {
            Logger.error("Failed to connect database", err);
        });
}
