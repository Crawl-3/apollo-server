import { gql } from "apollo-server";

export const TypeDefinitions = gql`
    type User {
        _id: ID!
        email: String!
        password: String!
        details: UserDetails!
    }
    type UserDetails {
        name: String!
    }

    type Query {
        users: [User]!
        user(_id: ID!): User
    }

    input AddUserDetailsInput {
        name: String!
    }

    type Mutation {
        addUser(email: String!, password: String!, details: AddUserDetailsInput!): User!
        deleteUser(_id: ID!): Boolean!
    }
`;
