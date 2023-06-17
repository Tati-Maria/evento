import {authMiddleware} from "@clerk/nextjs/server";

// set the paths that dont require authentication
const publicPaths = [
    "/",
    "/sign-in",
    "/sign-up",
    "/events",
    "/events/[id]",
    "/about"
];


export default authMiddleware({
    publicRoutes: publicPaths,
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}
