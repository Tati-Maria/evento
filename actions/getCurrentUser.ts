import { getAuth, clerkClient } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//     const {userId} = getAuth(req);

//     if(!userId) {
//         res.status(401).json({error: "Unauthorized"});
//     }

//     const userRecord = userId ? await clerkClient.users.getUser(userId) : null;

//     return res.status(200).json({user: userRecord});
// }


export async function getSession(req: NextApiRequest, res: NextApiResponse) {
    const {userId} = getAuth(req);

    if(!userId) {
        res.status(401).json({error: "Unauthorized"});
    }

    const userRecord = userId ? await clerkClient.users.getUser(userId) : null;

    return res.status(200).json({user: userRecord});
}






