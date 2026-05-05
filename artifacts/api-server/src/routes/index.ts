import { Router, type IRouter } from "express";
import healthRouter from "./health";
import intakeRouter from "./intake";
import resellerRouter from "./reseller";
import storageRouter from "./storage";
import { requireOperator } from "../middleware/operator-auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(intakeRouter);
router.use("/storage", requireOperator);
router.use(storageRouter);
router.use("/reseller", requireOperator);
router.use(resellerRouter);

export default router;
