import { Router, type IRouter } from "express";
import healthRouter from "./health";
import intakeRouter from "./intake";
import resellerRouter from "./reseller";
import { requireOperator } from "../middleware/operator-auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(intakeRouter);
router.use("/reseller", requireOperator);
router.use(resellerRouter);

export default router;
