import { Router, type IRouter } from "express";
import { db, intakeSubmissions } from "@workspace/db";

const router: IRouter = Router();

router.post("/intake", async (req, res) => {
  const body = req.body as Record<string, unknown>;

  const serviceType = typeof body.serviceType === "string" && body.serviceType.trim();
  const name = typeof body.name === "string" && body.name.trim();
  const email = typeof body.email === "string" && body.email.trim();

  if (!serviceType || !name || !email || !email.includes("@")) {
    res.status(400).json({ ok: false, error: "Missing required fields" });
    return;
  }

  const answers =
    body.answers && typeof body.answers === "object" && !Array.isArray(body.answers)
      ? (body.answers as Record<string, unknown>)
      : {};

  const phone = typeof body.phone === "string" ? body.phone.trim() || null : null;
  const realLife = typeof body.realLife === "string" ? body.realLife.trim() || null : null;
  const bestTime = typeof body.bestTime === "string" ? body.bestTime.trim() || null : null;

  try {
    await db.insert(intakeSubmissions).values({
      serviceType,
      answers,
      name,
      email,
      phone,
      realLife,
      bestTime,
    });
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err, "intake insert failed");
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

export default router;
