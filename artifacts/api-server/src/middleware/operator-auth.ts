import type { Request, RequestHandler } from "express";

declare module "express" {
  interface Request {
    operatorEmail?: string;
  }
}

type OperatorRequest = Request & { operatorEmail?: string };

function parseAllowlist(raw: string | undefined): Set<string> {
  if (!raw) return new Set();
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > 0),
  );
}

const allowlist = parseAllowlist(process.env.OPERATOR_EMAILS);

export const requireOperator: RequestHandler = (req, res, next) => {
  const header = req.headers["x-operator-email"];
  const raw = Array.isArray(header) ? header[0] : header;
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";

  if (!email) {
    res.status(401).json({ error: "Operator authentication required" });
    return;
  }

  if (allowlist.size > 0 && !allowlist.has(email)) {
    req.log.warn({ email }, "Rejected non-allowlisted operator");
    res.status(403).json({ error: "Operator not authorized" });
    return;
  }

  (req as OperatorRequest).operatorEmail = email;
  next();
};
