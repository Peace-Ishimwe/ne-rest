import { Router } from "express";
import { authRouter } from "./auth.routes";
import { profileRouter } from "./profile.routes";
import vehicleRouter from "./vehicle.routes";

const router = Router()

router.use('/auth', authRouter)
router.use('/profile', profileRouter)
router.use('/vehicle', vehicleRouter)

export default router