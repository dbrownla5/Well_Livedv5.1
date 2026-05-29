import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactSubmissions, insertContactSubmissionSchema } from "@workspace/db";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parse = insertContactSubmissionSchema.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ ok: false, error: "Invalid submission." });
    return;
  }

  try {
    const [row] = await db
      .insert(contactSubmissions)
      .values(parse.data)
      .returning({ id: contactSubmissions.id });

    logger.info({ id: row?.id, name: parse.data.name, summary: parse.data.summary }, "Contact form submission received");
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to save contact submission");
    res.status(500).json({ ok: false, error: "Something went wrong. Please try again." });
  }
});

export default router;
