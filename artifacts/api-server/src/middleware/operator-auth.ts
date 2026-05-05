import type { RequestHandler } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import type { EmailAddress } from "@clerk/express";

export const requireOperator: RequestHandler = async (req, res, next) => {
  const auth = getAuth(req);
  const userId = auth?.userId;

  if (!userId) {
    res.status(401).json({ error: "Operator authentication required" });
    return;
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    const primary = user.emailAddresses.find(
      (e: EmailAddress) => e.id === user.primaryEmailAddressId,
    );
    const email = primary?.emailAddress ?? user.emailAddresses[0]?.emailAddress;

    if (!email) {
      req.log.warn({ userId }, "Clerk user has no email address");
      res.status(403).json({ error: "Operator email not found" });
      return;
    }

    req.operatorEmail = email;
    next();
  } catch (err) {
    req.log.error({ err, userId }, "Failed to fetch Clerk user");
    res.status(401).json({ error: "Operator verification failed" });
  }
};
