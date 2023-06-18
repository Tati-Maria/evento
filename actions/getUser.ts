import {clerkClient} from "@clerk/nextjs";

export async function getUser(userId: string) {
    const user = await clerkClient.users.getUser(userId);
    return user;
}

export async function getUsers() {
    const users = await clerkClient.users.getUserList();
    return users;
}