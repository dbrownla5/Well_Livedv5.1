import type { Request, RequestHandler } from "express";
import { getAuth } from "@clerk/express";

declare module "express" {
  interface Request {
    operatorEmail?: string;
  }
}

export const requireOperator: RequestHandler = (req, res, next) => {
  const auth = getAuth(req);
  const userId = auth?.userId;

  if (!userId) {
    res.status(401).json({ error: "Operator authentication required" });
    return;
  }

  req.operatorEmail = userId;
  next();
};
