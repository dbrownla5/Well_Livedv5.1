import { Router, type IRouter } from "express";
import healthRouter from "./health";
import voiceRouter from "./voice";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(voiceRouter);
router.use(contactRouter);

export default router;
