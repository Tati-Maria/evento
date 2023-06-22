import {authMiddleware} from "@clerk/nextjs/server";
import { redirectToSignIn } from "@clerk/nextjs";

// set the paths that dont require authentication
const publicPaths = [
    "/",
    "/sign-in",
    "/sign-up",
    "/events",
    "/events/:path*",
    "/about"
];


export default authMiddleware({
    publicRoutes: publicPaths,
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
}
