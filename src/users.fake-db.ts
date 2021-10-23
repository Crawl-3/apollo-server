export const users: User[] = [
    { id: "1", details: { username: "John Doe" } },
    { id: "2", details: { username: "Mr. President" } },
];

export interface User {
    id: string,
    details: UserDetails,
}

export interface UserDetails {
    username: string;
}