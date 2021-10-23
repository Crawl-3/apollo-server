import { gql } from "apollo-server";

export const TypeDefinitions = gql`
    type User {
        id: ID!
        details: UserDetails!
    }
    type UserDetails {
        username: String!
    }

    type Query {
        users: [User]!
        user(id: ID!): User
    }

    input UserInput {
        details: UserDetailsInput!
    }
    input UserDetailsInput {
        username: String!
    }
    
    type Mutation {
        addUser(user: UserInput): User
    }
`;