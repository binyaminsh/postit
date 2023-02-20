// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Pls sign in to delete a post." });
    }

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });

    try {
      const result = await prisma.post.delete({
        where: {
          id: req.body,
        },
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ err: "Error has occurred." });
    }
  }
}
