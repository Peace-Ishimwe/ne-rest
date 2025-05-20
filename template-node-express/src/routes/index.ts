import { Router } from "express";
import { authRouter } from "./auth.routes";
import { profileRouter } from "./profile.routes";
import { parkingRouter } from "./parking.routes";

const router = Router()

router.use('/auth', authRouter)
router.use('/profile', profileRouter)
router.use('/parking', parkingRouter)

export default router